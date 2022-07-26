import Image from "./Image";
import "../assets/css/footer.css"

export default function Footer({sourceImage ,children}) {
    return (
        <footer>
            <Image classExtra="image-container small">
                <img src={sourceImage} alt="" />
            </Image>
            <div className="footer-info">
                {children}
            </div>
        </footer>
    );
}