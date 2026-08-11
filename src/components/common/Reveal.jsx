import useInViewFade from "../../hooks/useInViewFade";

export default function Reveal({ as: Tag = "div", className = "", delay = 0, style = {}, children, ...rest }) {
  const { ref, isVisible } = useInViewFade();

  return (
    <Tag
      ref={ref}
      className={`fade-in-up ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ ...style, transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
