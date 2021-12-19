const Header = (props) => {
  return (
    <div>
      <header>
        {/* End top line*/}
        <div className="container">
          <div className="row">
            <nav className="col-9">
              <a
                className="cmn-toggle-switch cmn-toggle-switch__htx open_close"
                href="javascript:void(0);"
              >
                <span>Menu mobile</span>
              </a>
              <div className="main-menu">
                <div id="header_menu">
                  <h1>DriveThrough</h1>
                </div>
                <ul>
                  <li className="submenu">
                    <a href="javascript:void(0);" className="show-submenu">
                      Balance: {props.balance}cUSD
                    </a>
                  </li>
                </ul>
              </div>
              {/* End main-menu */}
            </nav>
          </div>
        </div>
        {/* container */}
      </header>
      <section
        className="parallax-window"
        data-parallax="scroll"
        data-image-src="https://images.unsplash.com/photo-1543465077-db45d34b88a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format"
        data-natural-width={1400}
        data-natural-height={470}
      >
        <div className="parallax-content-1">
          <div className="animated fadeInDown">
            <h1>Welcome to DriveThrough</h1>
            <p>Get your Parking tickets</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
