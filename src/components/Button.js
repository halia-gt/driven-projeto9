import "../assets/css/button.css"

export default function Button({ children, classExtra = "", type = "button" }) {
    return (
        <button className={classExtra} type={type}>
            {children}
        </button>
    );
}