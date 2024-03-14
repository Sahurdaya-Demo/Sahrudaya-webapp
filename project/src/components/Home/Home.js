import React,{useEffect,useState,useRef} from "react";
import AOS from "aos";
import axios from "axios";
import "aos/dist/aos.css";
import PureCounter from "@srexi/purecounterjs";
import {Player} from '@lottiefiles/react-lottie-player'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './assets/css/style.css'
import './assets/bootstrap-icons/bootstrap-icons.css';
import LoadExternalScript from "../../LoadExternalScript";
import { useNavigate } from "react-router-dom";
import { UnloadExternalScript } from "../../UnloadExternalScript";
import emailjs from '@emailjs/browser';
import { Form, Button, Row, Col ,ProgressBar} from 'react-bootstrap';
import { LinkApi } from "../Utils/Resource";
function Home(){
  // let jsonDatacon;
  const [count,setcount]=useState('')
 
  const navigate=useNavigate();
     useEffect(() => {
    LoadExternalScript(['js/main.js']);
    AOS.init();
    AOS.refresh();
    new PureCounter();
    retrieve();
    
  }, []);
    const retrieve=async()=>{
      // const response= await fetch(`http://127.0.0.1:8000/formsubmit/`)
      const response= await fetch(`${LinkApi}formsubmit/`)
      const jsonDatacon = await response.json();
      setcount(jsonDatacon.length)
      // console.log(jsonDatacon.length)
    }

  // const[email,setemail]=useState('')
  // const[subject,setsubject]=useState('')
  // const[body,setbody]=useState('')
  // const[name,setname]=useState('')
  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollpos > currentScrollPos || currentScrollPos === 0);
      setPrevScrollpos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      UnloadExternalScript(['js/main.js'])
    };
  }, [prevScrollpos]);

//  const handleClick = async() => {
//   let formField = new FormData()
//   formField.append('email',email)
//   formField.append('subject',subject)
//   formField.append('body',body)
//   formField.append('name',name)
//   await axios({
//     method: 'post',
//     url:'http://127.0.0.1:8000/send-mail/',
//     data: formField
//   }).then(response=>{
//     alert('send email')
//     //  handleClose(); 
//   })
//  }

const [loading, setLoading] = useState(false);
const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm('service_231syu2', 'template_wo7d03j', form.current, {
        publicKey: 'ewrAx0BTzngglql6A',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert('succesfull');
          setLoading(false);
          document.getElementById("form").reset();

        },
        (error) => {
          console.log('FAILED...', error.text);
          setLoading(false);
        },
      );
  };
return(
    <>
    <link rel='stylesheet'type='text/css' href='../../../Homecss/style.css'></link>
      <header id="header" className="header fixed-top">
      <div style={{ top: visible ? '0' : '-80px', position: 'fixed', width: '100%', transition: 'top 0.5s' }}>
 <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

      <div  className="logo d-flex align-items-center">
        <img src="assets/logo.png" style={{width:"70px"}} alt=""/>
        <span>Sahrudaya Rajagiri</span>
      </div>

      <nav id="navbar" className="navbar">
        <ul>
          <li><a className="nav-link scrollto" href="#hero">Home</a></li>
          <li><a className="nav-link scrollto" href="#services">Services</a></li>
          <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
          <li><button className="getstarted scrollto" onClick={()=>navigate('/login')}>Login</button></li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>
</div>
    </div>
  </header>
    <section id="hero" className="hero d-flex align-items-center">

    <div className="container">
      <div className="row">
        <div className="col-lg-6 d-flex flex-column justify-content-center pt-lg-4">
          <h1 data-aos="fade-up">UNITING HEARTS FOR EMPOWERMENT AND DEVELOPMENT</h1>
          <h2 data-aos="fade-up" data-aos-delay="400">We are team of talented counsellors making lifes of people easier</h2>
          <div data-aos="fade-up" data-aos-delay="600">
            <div className="text-center text-lg-center">
              <a href="#about" className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                <span>Get Started</span>
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 hero-img mb-lg-5 pb-lg-5 ps-lg-5 pe-0" data-aos="zoom-out" data-aos-delay="200">   
          <Player 
          src='https://lottie.host/7ad77614-47f2-4d16-bc98-1e43dad79c14/Mr1blwHvwo.json'
          className="player ms-5"  
          style={{filter:"drop-shadow(2px 4px 6px )"}}
          autoplay
          loop
          />
        </div>
      </div>
    </div>

  </section>

  <main id="main">
    <section id="about" className="about">

      <div className="container" data-aos="fade-up">
        <div className="row gx-0">

          {/* <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
            <div className="content">
              <h3>Who We Are</h3>
              <h2>Expedita voluptas omnis cupiditate totam eveniet nobis sint iste. Dolores est repellat corrupti reprehenderit.</h2>
              <p>
                Quisquam vel ut sint cum eos hic dolores aperiam. Sed deserunt et. Inventore et et dolor consequatur itaque ut voluptate sed et. Magnam nam ipsum tenetur suscipit voluptatum nam et est corrupti.
              </p>
              <div className="text-center text-lg-start">
                <a href="#" className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                  <span>Read More</span>
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div> */}

          {/* <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
            <img src="assets/img/about.jpg" className="img-fluid" alt=""/>
          </div> */}

        </div>
      </div>
    </section>


    <section id="services" className="services">

      <div className="container" data-aos="fade-up">

        <header className="section-header">
          <h2>Services</h2>
          <p>"Life is for service"</p>
        </header>

        <div className="row gy-4">

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="service-box blue">
              <i className="bi bi-activity icon"></i>
              <h3>COMMUNITY MENTAL HEALTH CENTER</h3>
              <p>Sahrudaya provides educational services to the poor children.</p>
              <a href="#" className="read-more"><span>Read More</span> <i className="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="service-box orange">
              <i className="bi bi-person-arms-up icon"></i>
              <h3>SENIOR CITIZENS’ GROUP</h3>
              <p>Self Help Groups Formation and animation of Self Help Groups.</p>
              <a href="#" className="read-more"><span>Read More</span> <i className="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <div className="service-box green">
              <i className="bi bi-hearts icon"></i>
              <h3>HEAL-A-FAMILY</h3>
              <p>Sahrudaya commits to build ten houses a year for providing shelter.</p>
              <a href="#" className="read-more"><span>Read More</span> <i className="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
            <div className="service-box red">
              <i className="bi bi-balloon-heart icon"></i>
              <h3>CHILD SPONSERSHIP</h3>
              <p>Sahrudaya provides educational services to the poor children.</p>
              <a href="#" className="read-more"><span>Read More</span> <i className="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
            <div className="service-box purple">
              <i className="bi bi-gender-female icon"></i>
              <h3>SELF HELP GROUPS (Women)</h3>
              <p>Self Help Groups Formation and animation of Self Help Groups.</p>
              <a href="#" className="read-more"><span>Read More</span> <i className="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="700">
            <div className="service-box pink">
              <i className="bi-house-heart icon"></i>
              <h3>HOUSING PROJECT</h3>
              <p>Sahrudaya commits to build ten houses a year for providing shelter.</p>
              <a href="#" className="read-more"><span>Read More</span> <i className="bi bi-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <section id="team" className="team">

      <div className="container" data-aos="fade-up">

        <header className="section-header">
          <h2>Counsellors</h2>
          <p>Our helping Counsellors</p>
        </header>

        <div className="row gy-4">

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
            <div className="member">
              <div className="member-img">
                <img src="assets/team/team-2.jpg" className="img-fluid" alt=""/>
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>FR. DR. SHINTO THALIYAN</h4>
                <span>CMI CHAIRMAN</span>
                <p>Fr. Shinto completed his post-graduation in social work with a specialization in medical and psychiatric social work from Loyola College (Autonomous) Chennai. He holds an MPhil in Social Work from Rajagiri College of Social Sciences, Kalamassery and secured PhD on the topic “Psycho-social well-being of adolescents.</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
            <div className="member">
              <div className="member-img">
                <img src="assets/team/team-1.jpg" className="img-fluid" alt=""/>
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>DR. MANJU P EMMANUEL</h4>
                <span>COUNSELLOR</span>
                <p>MA, MPhil & PhD in Psychology</p>
              </div>

            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="300">
            <div className="member">
              <div className="member-img">
                <img src="assets/team/team-3.jpg" className="img-fluid" alt=""/>
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>AKHILA MOHANAN</h4>
                <span>COUNSELLOR</span>
                <p>Msc Psychology</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="400">
            <div className="member">
              <div className="member-img">
                <img src="assets/team/team-4.jpg" className="img-fluid" alt=""/>
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info">
                <h4>ROSELIN MARY BENNY</h4>
                <span>COUNSELLOR</span>
                <p>MSW (M&P)</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
    <section id="clients" className="clients">

      <div className="container text-center" data-aos="fade-up">

        <header className="section-header">
          <h2>Sahrudaya</h2>
          <p>In collaboration with</p>
        </header>
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
      <SwiperSlide><img src="assets/clients/client-1.png" className="img-fluid" alt=""/></SwiperSlide>
        <SwiperSlide><img src="assets/clients/client-2.png" className="img-fluid" alt=""/></SwiperSlide>
        <SwiperSlide><img src="assets/clients/client-3.png" className="img-fluid" alt=""/></SwiperSlide>
        <SwiperSlide><img src="assets/clients/client-4.png" className="img-fluid" alt=""/></SwiperSlide>
      </Swiper>
      </div>

    </section>

  <section id="counts" className="counts">
      <div className="container" data-aos="fade-up">

        <div className="row gy-4">

          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="bi bi-people"></i>
              <div>
                <div className=" d-flex">
                <span data-pure-start="0" data-purecounter-end="337" data-pure-duration="1" className="purecounter"></span>              
                </div>
                <p>Team Members</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="bi bi-journal-richtext" style={{color: "ee6c20"}}></i>
              <div>    
              <div className="d-flex">
                <span data-pure-start="0" data-purecounter-end={count} data-purecounter-duration="1" className="purecounter"></span>              
                {/* <span>+</span> */}
                </div>
                <p>Counselling Sessions</p>             
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="bi bi-award" style={{color: "#15be56"}}></i>
              <div>
               <div className="d-flex">
                <span data-purecounter-start="0" data-purecounter-end="85" data-purecounter-duration="1" className="purecounter"></span>
                 <span>+</span>
                </div>
                <p>Winning Awards</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="bi bi-easel" style={{color: "#bb0852"}}></i>
              <div>
              <div className=" d-flex">
                <span data-purecounter-start="0" data-purecounter-end="100" data-purecounter-duration="1" className="purecounter"></span>
                <span>+</span>
                </div>
                <p>Project Done</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
        <section id="contact" className="contact">

      <div className="container" data-aos="fade-up">

        <header className="section-header">
          <h2>Contact</h2>
          <p>Contact Us</p>
        </header>

        <div className="row gy-4">

          <div className="col-lg-6">

            <div className="row gy-4">
              <div className="col-md-6">
                <div className="info-box">
                  <i className="bi bi-geo-alt"></i>
                  <h3>Address</h3>
                  <p>The Chairman<br/>                    
                    Sahrudaya Services and Charities<br/>
                    S.H. Provincial House <br/>
                    Rajagiri P.O., Kalamassery<br/>
                    Ernakulam, Kerala<br/>India - 683 104</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-box">
                  <i className="bi bi-telephone"></i>
                  <h3>Call Us</h3>
                  <h5>Office</h5>
                  <p>	0484-2555702 , 0484-2911170</p>
                  <h5>Mobile</h5>
                  <p> 09495352786  ,09496829098</p><br/><br/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-box">
                  <i className="bi bi-envelope"></i>
                  <h3>Email Us</h3>
                  <p>sahrudaya_shp@yahoo.com</p><br/><p> </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-box">
                  <i className="bi bi-clock"></i>
                  <h3>Open Hours</h3>
                  <p>Monday - Friday<br></br>9:00AM - 05:00PM</p>
                </div>
              </div>
            </div>

          </div>

               <div className="col-lg-6">
      <Form ref={form} className="php-email-form" id="form" onSubmit={sendEmail}>
        <Row className="gy-4">
          <Col md={6}>
            <Form.Control type="text" name="user_name" placeholder="Your Name" required />
          </Col>
          <Col md={6}>
            <Form.Control type="email" name="user_email" placeholder="Your Email" required />
          </Col>
          <Col md={12}>
            <Form.Control type="text" name="subject" placeholder="Subject" required />
          </Col>
          <Col md={12}>
            <Form.Control as="textarea" name="message" rows="6" placeholder="Message" required />
          </Col>
           <Col md={12} className="text-center">
            {/* {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : ( */}
                <Button type="submit" disabled={loading}>Send Message
                {loading ?  <ProgressBar animated variant="success" now={100} />:null}</Button>
           
          </Col>
        </Row>
      </Form>
    </div>
        </div>

      </div>

    </section>

  </main>
  {/* <!-- ======= Footer ======= -->
  <footer id="footer" className="footer">

    <div className="footer-newsletter">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 text-center">
            <h4>Our Newsletter</h4>
            <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
          </div>
          <div className="col-lg-6">
            <form action="" method="post">
              <input type="email" name="email"><input type="submit" value="Subscribe">
            </form>
          </div>
        </div>
      </div>
    </div>

    <div className="footer-top">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-info">
            <a href="index.html" className="logo d-flex align-items-center">
              <img src="assets/img/logo.png" alt="">
              <span>FlexStart</span>
            </a>
            <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.</p>
            <div className="social-links mt-3">
              <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
              <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i className="bi bi-chevron-right"></i> <a href="#">Home</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="#">About us</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="#">Services</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="#">Terms of service</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><i className="bi bi-chevron-right"></i> <a href="#">Web Design</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="#">Web Development</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="#">Product Management</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="#">Marketing</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="#">Graphic Design</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact Us</h4>
            <p>
              A108 Adam Street <br>
              New York, NY 535022<br>
              United States <br><br>
              <strong>Phone:</strong> +1 5589 55488 55<br>
              <strong>Email:</strong> info@example.com<br>
            </p>

          </div>

        </div>
      </div>
    </div>

    <div className="container">
      <div className="copyright">
        &copy; Copyright <strong><span>FlexStart</span></strong>. All Rights Reserved
      </div>
      <div className="credits">
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
    </div>
  </footer> */}
</>
)
};
export default Home