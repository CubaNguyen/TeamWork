import "./Login.scss";

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Đăng nhập</h2>
                <input type="email" placeholder="Email" className="input-field" />
                <input type="password" placeholder="Mật khẩu" className="input-field" />
                <a href="#" className="forgot-password">Quên mật khẩu?</a>
                <button className="login-button">ĐĂNG NHẬP</button>
                <div className="extra-links">
                    <a href="#">Tạo tài khoản</a>
                    <a href="#">Quay lại cửa hàng</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
