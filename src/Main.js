import { useState } from "react";
import { v4 as uuid } from "uuid";
const Main = (props) => {
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const mintTicket = () => {
    props.addTicket(uuid(), price, category);
  };

  return (
    <div>
      <main>
        <div className="container margin_60">
          <div className="row">
            <div className="col-lg-9">
              <div
                className="strip_all_tour_list wow fadeIn"
                data-wow-delay="0.1s"
              >
                {props.tickets.map((ticket) => (
                  <div className="row">
                    <div className="col-lg-4 col-md-4">
                      <div className="ribbon_3 popular">
                        <span>{ticket.category}</span>
                      </div>
                      <div className="img_list">
                        <a href="#">
                          <img
                            src="https://images.unsplash.com/photo-1635070636690-d887c1a77e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
                            alt="Image"
                          />
                          <div className="short_info" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="tour_list_desc">
                                         
                      <br />
                      <br />
                      <br />
                        <h3>
                          <strong>NO: {ticket.ticketNumber}</strong>
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2">
                      <div className="price_list">
                        <div>
                          <sup>$</sup>
                          {ticket.price}*
                          <br />
                          <br />
                          {(ticket.owner === props.address && ticket.booked) ? (
                            !props.isAdmin && <p>
                              <a  onClick={() =>
                                  props.revokeTicket(ticket.index)
                                }
                                href="#" className="btn_1">
                                Revoke
                              </a>
                            </p>
                          ) : (
                            !props.isAdmin && <p>
                              <a
                                onClick={() =>
                                  props.bookTicket(ticket.index)
                                }
                                href="#"
                                className="btn_1"
                              >
                                Book Now
                              </a>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {props.isAdmin && <div className="col-lg-8 add_bottom_15">
              <div className="form_title">
                <h3>Mint Ticket</h3>
                <p>For admin use only</p>
              </div>
              <div className="step">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-control"
                        name=""
                        id=""
                      >
                        <option value="VIP">VIP</option>
                        <option value="NORMAL">NORMAL</option>
                        <option value="LOW">LOW</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        onChange={(e) => setPrice(e.target.value)}
                        type="text"
                        className="form-control"
                        id="lastname_booking"
                        name="lastname_booking"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/*End step */}
              <div id="policy">
                <a onClick={mintTicket} href="#" className="btn_1 green medium">
                  Mint
                </a>
              </div>
            </div>}
          </div>
          {/* End row */}
        </div>
        {/* End container */}
      </main>
    </div>
  );
};

export default Main;
