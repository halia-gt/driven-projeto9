import "../assets/css/image.css";

export default function Image({children, classExtra = "image-container"}) {
    return (
        <div className={classExtra}>
            {children}
        </div>
    );
}