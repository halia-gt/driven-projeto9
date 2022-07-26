import "../assets/css/button.css"

export default function Button({ children, classExtra = "" }) {
    return (
        <button className={classExtra}>
            {children}
        </button>
    );
}