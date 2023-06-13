import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Style.css";
import Gp from "../js/main";
import { useForm } from "react-hook-form";
import axios from "axios";

//importing images
import AccessSytem from "../img/Accesssystem.png";
import About from "../img/about.jpg";
// import team1 from "../img/team/team-1.jpg";
// import team2 from "../img/team/team-2.jpg";
// import team3 from "../img/team/team-3.jpg";
// import team4 from "../img/team/team-4.jpg";
// import { Carousel } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

//api url for endpoints
const API = process.env.REACT_APP_API_URL;
export default function Landing() {
  const [isNavExpanded, setisNavExpanded] = useState(false);
  //for contactus form
  const [contact, setcontact] = useState({
    email: undefined,
    phonenumber: undefined,
    message: undefined,
  });
  const { email, phonenumber, message } = contact;

  const onInputChange = (e) => {
    setcontact({ ...contact, [e.target.name]: e.target.value });
    console.log(contact);
  };

  useEffect(() => {
    Gp();
  }, []);

  const closenavbar = () => {
    setisNavExpanded(!isNavExpanded);
  };

  const {
    register,
    handleSubmit,
    watch,
    
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    axios
      .post(API + "/feedback", {
        email: watch("email"),
        contactDetail: parseInt(watch("phonenumber")),
        content: watch("message"),
      })
      .then((response) => {
        console.log(response.data);
        console.log("sent");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  };
  const validatePhoneNumber = (value) => {
    const phoneNumberRegex = /^9\d{9}$/; // Regular expression to validate phone number format
    return phoneNumberRegex.test(value) || "Invalid phone number format";
  };

  const validateWordCount = (value) => {
    // if (!value) {
    //   return 'This field is required';
    // }
    const wordCount = value.trim().split(/\s+/).length; // Counting words by splitting on whitespace
    return wordCount <= 100 || "Only 100 words are allowed";
  };

  return (
    <>
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center justify-content-lg-between">
          <h1 className="logo me-auto me-lg-0">
            <Link to={"/"}>
              <img src={AccessSytem} alt="accesssytem" />
            </Link>
          </h1>
          <nav
            id={"navbar"}
            className={
              isNavExpanded
                ? "navbar-mobile order-last order-lg-0"
                : "navbar order-last order-lg-0"
            }
          >
            <ul>
              <li>
                <a className="nav-link scrollto active" href="#hero">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#services">
                  Services
                </a>
              </li>
              {/* <li >
                <a className="nav-link scrollto" href="#team">
                  Team
                </a>
              </li> */}
              <li>
                <a className="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
            <i
              className=" bi-list mobile-nav-toggle"
              onClick={() => closenavbar()}
            ></i>
          </nav>
          {/* <!-- .navbar --> */}

          <Link to={"/login"} className="get-started-btn">
            Login
          </Link>
        </div>
      </header>
      {/* <!-- End Header -->

    <!-- ======= Hero Section ======= --> */}
      <section
        id="hero"
        className="d-flex align-items-center justify-content-center"
      >
        <div className="container" data-aos="fade-up">
          <div
            className="row justify-content-center"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div className="col-xl-6 col-lg-8">
              <h1>
                Access <span>Systems</span>
              </h1>
              <h2>Software Development for Better Future</h2>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Hero --> */}

      <main id="main">
        {/* <!-- ======= About Section ======= --> */}
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div
                className="col-lg-6 order-1 order-lg-2"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <img src={About} className="img-fluid" alt="" />
              </div>
              <div
                className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <h3>Overview</h3>
                <p
                  style={{ textAlign: "justify", fontSize: 20, width: 550 }}
                  className="fst-italic"
                >
                  Access Systems is a part of Access Online Inc., a leading
                  service company based in the US with their offices in
                  Mangalore, India and Nepal. Access Systems is a collective of
                  customer-obsessed visionaries. At our core is a commitment to
                  diversity and sustainability. Our services are engineered for
                  security, reliability and scalability, running the full stack
                  from infrastructure to applications to devices and hardware.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End About Section -->


      <!-- ======= Services Section ======= --> */}
        <section id="services" className="services">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Services</h2>
              <p>Check our Services</p>
            </div>

            <div className="row">
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="icon-box">
                  <div className="icon">
                    <i class="bi bi-building-gear"></i>
                  </div>
                  <h4>
                    <Link>IT Infrastructure</Link>
                  </h4>
                  <p>
                    Provision of structured cabling for data, telecom,
                    surveillance and fiber cabling
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="icon-box">
                  <div className="icon">
                    <i class="bi bi-building-gear"></i>
                  </div>
                  <h4>
                    <Link>Software Development</Link>
                  </h4>
                  <p>
                    Provision of structured cabling for data, telecom,
                    surveillance and fiber cabling
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="icon-box">
                  <div className="icon">
                    <i class="bi bi-building-gear"></i>
                  </div>
                  <h4>
                    <Link>Automation</Link>
                  </h4>
                  <p>
                    Provision of structured cabling for data, telecom,
                    surveillance and fiber cabling
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Services Section -->

        

      <!-- ======= Cta Section ======= --> */}

        {/* <section id="cta" className="cta">
          <div className="container" data-aos="zoom-in">
            <div className="text-center">
              <h3>Call To Action</h3>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <Link className="cta-btn" href="#">
                Call To Action
              </Link>
            </div>
          </div>
        </section> */}
        {/* <!-- End Cta Section -->

      <!-- ======= Counts Section ======= --> */}
        {/* <section id="counts" className="counts">
          <div className="container" data-aos="fade-up">
            <div className="row no-gutters">
              <div
                className="image col-xl-5 d-flex align-items-stretch justify-content-center justify-content-lg-start"
                data-aos="fade-right"
                data-aos-delay="100"
              ></div>
              <div
                className="col-xl-7 ps-4 ps-lg-5 pe-4 pe-lg-1 d-flex align-items-stretch"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <div className="content d-flex flex-column justify-content-center">
                  <h3>Our Accomplishments</h3>
                  <br />
                  <div className="row">
                    <div className="col-md-6 d-md-flex align-items-md-stretch">
                      <div className="count-box">
                        <i className="bi bi-emoji-smile"></i>
                        <span
                          data-purecounter-start="0"
                          data-purecounter-end="6"
                          data-purecounter-duration="2"
                          className="purecounter"
                        ></span>
                        <p>
                          <strong>Happy Clients</strong>
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6 d-md-flex align-items-md-stretch">
                      <div className="count-box">
                        <i className="bi bi-journal-richtext"></i>
                        <span
                          data-purecounter-start="0"
                          data-purecounter-end="10"
                          data-purecounter-duration="2"
                          className="purecounter"
                        ></span>
                        <p>
                          <strong>Projects</strong>
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6 d-md-flex align-items-md-stretch">
                      <div className="count-box">
                        <i className="bi bi-clock"></i>
                        <span
                          data-purecounter-start="0"
                          data-purecounter-end="10"
                          data-purecounter-duration="4"
                          className="purecounter"
                        ></span>
                        <p>
                          <strong>Years of experience</strong>
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6 d-md-flex align-items-md-stretch">
                      <div className="count-box">
                        <i className="bi bi-award"></i>
                        <span
                          data-purecounter-start="0"
                          data-purecounter-end="5"
                          data-purecounter-duration="4"
                          className="purecounter"
                        ></span>
                        <p>
                          <strong>Awards</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
             
              </div>
            </div>
          </div>
        </section> */}
        {/* <!-- End Counts Section --> */}

        {/* <!-- ======= Testimonials Section ======= --> */}

        {/* <section id="testimonials" className="testimonials">
          <div className="container" data-aos="zoom-in">
            <div
              className="testimonials-slider swiper"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="swiper-wrapper">
                {/* <div className="swiper-slide"> */}
        {/* <Carousel indicators={false}>
                  <Carousel.Item>
                    <div className="testimonial-item">
                      <img src={team1} className="testimonial-img" alt="" />

                      <h3>Bibek Basnet</h3>

                      <h4>Jr. Software Engineer </h4>
                      <p>
                        <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                        Never Give Up
                        <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                      </p>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="testimonial-item">
                      <img src={team2} className="testimonial-img" alt="" />
                      <h3>Bibek Basnet</h3>

                      <h4>Jr. Software Engineer </h4>
                      <p>
                        <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                        When you're a kid, you think that you'll always be...
                        protected, and cared for. Then, one day, you realize
                        that's not true.
                        <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                      </p>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="testimonial-item">
                      <img src={team2} className="testimonial-img" alt="" />
                      <h3>Arya Bhandari</h3>

                      <h4>Jr. Data Analyst </h4>
                      <p>
                        <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                        When you're a kid, you think that you'll always be...
                        protected, and cared for. Then, one day, you realize
                        that's not true.
                        <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                      </p>
                    </div>
                  </Carousel.Item>
                </Carousel> */}
        {/* </div>
            </div>
          </div>
        </section> * */}

        {/* <!-- End Testimonials Section -->

      <!-- ======= Team Section ======= --> */}
        {/* <section id="team" className="team">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Team</h2>
              <p>Check our Team</p>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                <div className="member" data-aos="fade-up" data-aos-delay="100">
                  <div className="member-img">
                    <img src={team1} className="img-fluid" alt="asd" />
                    <div className="social">
                      <Link href="">
                        <i className="bi bi-twitter"></i>
                      </Link>
                      <Link href="">
                        <i className="bi bi-facebook"></i>
                      </Link>
                      <Link href="">
                        <i className="bi bi-instagram"></i>
                      </Link>
                      <Link href="">
                        <i className="bi bi-linkedin"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="member-info">
                    <h4>Bibek Basnet</h4>
                    <span>Jr. Software Engineer</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                <div className="member" data-aos="fade-up" data-aos-delay="200">
                  <div className="member-img">
                    <img
                      src={team2}
                      className="img-fluid"
                      alt="productmanager"
                    />
                    <div className="social">
                      <Link>
                        <i className="bi bi-twitter"></i>
                      </Link>
                      <Link href="">
                        <i className="bi bi-facebook"></i>
                      </Link>
                      <Link href="">
                        <i className="bi bi-instagram"></i>
                      </Link>
                      <Link href="">
                        <i className="bi bi-linkedin"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="member-info">
                    <h4>Sarah Jhonson</h4>
                    <span>Product Manager</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                <div className="member" data-aos="fade-up" data-aos-delay="300">
                  <div className="member-img">
                    <img src={team3} className="img-fluid" alt="team3" />
                    <div className="social">
                      <Link href="">
                        <i className="bi bi-twitter"></i>
                      </Link>
                      <Link href="">
                        <i className="bi bi-facebook"></i>
                      </Link>
                      <Link href="">
                        <i className="bi bi-instagram"></i>
                      </Link>
                      <Link href="">
                        <i className="bi bi-linkedin"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="member-info">
                    <h4>William Anderson</h4>
                    <span>CTO</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                <div className="member" data-aos="fade-up" data-aos-delay="400">
                  <div className="member-img">
                    <img src={team4} className="img-fluid" alt="team4" />
                    <div className="social">
                      <Link href="">
                        <i className="bi bi-twitter"></i>
                      </Link>
                      <Link href="">
                        <i className="bi bi-facebook"></i>
                      </Link>
                      <Link href="">
                        <i className="bi bi-instagram"></i>
                      </Link>
                      <Link href="">
                        <i className="bi bi-linkedin"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="member-info">
                    <h4>Amanda Jepson</h4>
                    <span>Accountant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* <!-- End Team Section -->

      <!-- ======= Contact Section ======= --> */}
        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              {/* <h2>Contact</h2> */}
              <p>Contact Us</p>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.1397660463763!2d85.32540561491567!3d27.68207478280241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19bdf86bc51f%3A0xd264f9a9677ee6b3!2sAccess%20Systems!5e0!3m2!1sen!2snp!4v1680790417629!5m2!1sen!2snp"
              width="600"
              height="800"
              className="border-0 w-100"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="row mt-5">
              <div className="col-lg-4">
                <div className="info">
                  <div className="address">
                    <i className="bi bi-geo-alt"></i>
                    <h4>Location:</h4>
                    <p>Lalitpur,Nepal</p>
                  </div>

                  <div className="email">
                    <i className="bi bi-envelope"></i>
                    <h4>Email:</h4>
                    <p>info@accesssystems.com.np</p>
                  </div>

                  {/* <div className="phone">
                    <i className="bi bi-phone"></i>
                    <h4>Call:</h4>
                    <p>9849935099</p>
                  </div> */}
                </div>
              </div>

              <div className="col-lg-8 mt-5 mt-lg-0">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="php-email-form"
                >
                  <div className="row">
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        onChange={(e) => onInputChange(e)}
                        required
                        {...register("email")}
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        id="phonenumber"
                        name="phonenumber"
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                        required
                        {...register("phonenumber", {
                          validate: validatePhoneNumber,
                        })}
                      />
                      {errors.phonenumber && (
                        <span style={{ color: "red" }}>
                          {errors.phonenumber.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-group mt-3">
                    <textarea
                      className="form-control"
                      name="message"
                      rows="5"
                      placeholder="Message"
                      required
                      {...register("message", { validate: validateWordCount })}
                      onChange={(e) => onInputChange(e)}
                    ></textarea>
                    {errors.description && (
                      <span style={{ color: "red" }}>
                        {errors.description.message}
                      </span>
                    )}
                  </div>
                  <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Contact Section --> */}
      </main>
      {/* <!-- End #main -->

    <!-- ======= Footer ======= --> */}
      <footer id="footer">
        <div className="container">
          <div className="copyright">
            &copy; Copyright{" "}
            <strong>
              <span>Access Systems</span>
            </strong>
            . All Rights Reserved
          </div>
          {/* <div className="credits">
            Designed by <Link href="#">Aayush Gurung</Link>
          </div> */}
        </div>
      </footer>
      {/* <!-- End Footer --> */}
      {/* <div id="preloader"></div> */}
      {/* <Link
        href="/"
        class="back-to-top d-flex align-items-center justify-content-center"
      >
        <i class="bi bi-arrow-up-short"></i>
      </Link> */}

      {/* <!-- Template Main JS File --> */}
      <script type="text/babel" src="../js/main.js"></script>
    </>
  );
}
