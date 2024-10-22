import "./footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col l-3">
            <div className="ft_item">
              <img
                width="120px"
                height="70px"
                src="https://i.pinimg.com/enabled_hi/564x/fc/6d/23/fc6d23f0c26e68f40aee5bb6e9edf83d.jpg"
                alt=""
              />
              <p>
                <i className="ri-home-2-line"></i>Home
              </p>
              <p>
                <i className="ri-phone-line"></i>(+84)934 323 882
              </p>
              <p>
                <i className="ri-mail-line"></i>thanhnam4012@gmail.com
              </p>
            </div>
          </div>
          <div className="col l-3">
            <div className="ft_item">
              <h6>Dịch vụ khách hàng</h6>
              <p>Chính sách khách hàng thân thiết</p>
              <p>Chính sách bảo mật</p>
              <p>Đăng ký đối tác</p>
            </div>
          </div>
          <div className="col l-3">
            <div className="ft_item">
              <h6>Về Panda</h6>
              <p>Giới thiệu</p>
              <p>Liên hệ</p>
              <p>Tuyển dụng</p>
            </div>
          </div>
          <div className="col l-3">
            <div className="ft_item">
              <h6>Panda trên mạng xã hội</h6>
              <p>
                <i className="ri-facebook-circle-line"></i> Facebook
              </p>
              <p>
                <i className="ri-youtube-line"></i> Youtube
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
