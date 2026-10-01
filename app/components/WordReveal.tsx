interface IProps {
    text: string
    className?: string
    initialDelay?: number
    step?: number
}

export default function WordReveal({ text, className = "", initialDelay = 0, step = 90 }: IProps) {
    return (
        <span className={`word-reveal ${className}`}>
            {text.split(" ").map((word, index) =>
                <span key={index} style={{ animationDelay: `${initialDelay + index * step}ms` }}>
                    {word}&nbsp;
                </span>
            )}
        </span>
    )
}
