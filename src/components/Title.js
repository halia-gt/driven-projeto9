import "../assets/css/title.css";

export default function Title( { children, classExtra = "" }) {
    return (
        <h2 className={classExtra}>
            {children}
        </h2>
    );
}