"""Exporta só o movimento de um FBX (esqueleto Mixamo) para GLB. Uso: chamado por scripts/add-move.sh."""
import bpy, sys

src, dst = sys.argv[-2], sys.argv[-1]
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.fbx(filepath=src, automatic_bone_orientation=True)
arm = [o for o in bpy.data.objects if o.type == 'ARMATURE'][0]
scene = bpy.context.scene


def assign(action):
    arm.animation_data.action = action
    if getattr(action, 'slots', None):
        arm.animation_data.action_slot = action.slots[0]


def motion(action):
    """Quanto a ação mexe de fato nos ossos que deformam o corpo (há ações que só mexem em controles de IK,
    e arquivos que trazem animações de outros movimentos junto)."""
    assign(action)
    first, last = int(action.frame_range[0]), int(action.frame_range[1])
    deform = [bone for bone in arm.pose.bones if bone.name in DEFORM_BONES]
    samples = {}
    for frame in range(first, last + 1, max(1, (last - first) // 15)):
        scene.frame_set(frame)
        for bone in deform:
            samples.setdefault(bone.name, []).append(bone.matrix_basis.to_quaternion())
    return sum(max(q.rotation_difference(qs[0]).angle for q in qs) for qs in samples.values())


DEFORM_BONES = set()
for mesh in [o for o in bpy.data.objects if o.type == 'MESH']:
    DEFORM_BONES |= {group.name for group in mesh.vertex_groups}

action = max(bpy.data.actions, key=motion)
for other in list(bpy.data.actions):
    if other != action:
        bpy.data.actions.remove(other)
assign(action)
print('ACAO_ESCOLHIDA', action.name, action.frame_range[:])

# Fica uma malha pequena (o exportador precisa dela para manter o esqueleto) e só os ossos que deformam o corpo.
meshes = sorted([o for o in bpy.data.objects if o.type == 'MESH'], key=lambda o: len(o.data.polygons))
used = set()
for mesh in meshes:
    used |= {group.name for group in mesh.vertex_groups}
for mesh in meshes[1:]:
    bpy.data.objects.remove(mesh, do_unlink=True)

keep = set()
for name in used:
    bone = arm.data.bones.get(name)
    while bone:
        keep.add(bone.name)
        bone = bone.parent
bpy.context.view_layer.objects.active = arm
bpy.ops.object.mode_set(mode='EDIT')
for edit_bone in list(arm.data.edit_bones):
    if edit_bone.name not in keep:
        arm.data.edit_bones.remove(edit_bone)
bpy.ops.object.mode_set(mode='OBJECT')

bpy.ops.export_scene.gltf(filepath=dst, export_format='GLB', export_animations=True, export_animation_mode='ACTIONS')
