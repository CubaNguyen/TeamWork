import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceRange = () => {
    const [range, setRange] = useState([0, 4850000]);




    return (
        <div style={{ background: "#000", color: "#fff", padding: "5px", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px" }}>
                <span>Giá</span>

            </div>

            <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
                <div style={{ border: "1px solid #fff", padding: "5px", borderRadius: "4px", width: "100px", textAlign: "center" }}>
                    ₫ {range[0]}
                </div>
                <span>-</span>
                <div style={{ border: "1px solid #fff", padding: "5px", borderRadius: "4px", width: "100px", textAlign: "center" }}>
                    ₫ {range[1]}
                </div>
            </div>

            <Slider
                range
                min={0}
                max={4850000}
                value={range}
                onChange={setRange}
                trackStyle={[{ backgroundColor: "#fff" }]}
                handleStyle={[{ backgroundColor: "#fff" }, { backgroundColor: "#fff" }]}
            />
        </div>
    );
};

export default PriceRange;
