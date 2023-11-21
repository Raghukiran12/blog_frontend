import React from 'react'
import './AboutUs.css';
const About = ()=>{
    return (
        <div>
          <div className="about-section">
            <h1>About Us Page</h1>
            <p></p>
            <p>Words are robust weapons for any cause, good or bad. As said by many wise people, words are very powerful and they have the ability to create a moment and also the strength to destroy it. At ZipThought, we believe in the limitless possibilities that words offer. Come explore diverse perspectives and write down an article to join an active community where ideas flourish and conversations thrive.

</p>
          </div>
    
          <h2 style={{ textAlign: 'center' }} className='our-team'>Our Team</h2>
          <div className="row">
            <div className="column">
              <div className="card">
                <div className="container">
                  <h2>Raghu Kiran</h2>
                  <p className="title">Full stack developer</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p><a href='mailto:raghukiran188@gmail.com'>raghukiran188@gmail.com</a></p>
                  <p><a href='https://www.linkedin.com/in/raghu-kiran-r/'><button className="button">Connect us on LinkedIn</button></a></p>
                </div>
              </div>
            </div>
    
            <div className="column">
              <div className="card">
                <div className="container">
                  <h2>Ramakrishna Prasad</h2>
                  <p className="title">Full stack developer</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p><a href='mailto:ramakrishnaprasad.2003@gmail.com'>ramakrishnaprasad.2003@gmail.com</a></p>
                  <p><a href='https://www.linkedin.com/in/ramakrishna-10r/'><button className="button">Connect us on LinkedIn</button></a></p>
                </div>
              </div>
            </div>
    
            <div className="column">
              <div className="card">
                <div className="container">
                  <h2>KSS Prasanth</h2>
                  <p className="title">Full stack developer</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p><a href='mailto:kantipudiprasanth2003@gmail.com'>kantipudiprasanth2003@gmail.com</a></p>
                  <p><a href='https://www.linkedin.com/in/sri-sai-prasanth-kantipudi-7a4218264/'><button className="button">Connect us on LinkedIn</button></a></p>           
                   </div>
              </div>
            </div>
    
            <div className="column">
              <div className="card">
                <div className="container">
                  <h2>Pavan Kumar</h2>
                  <p className="title">Full stack developer</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p><a href='mailto:pavanreddy2809@gmail.com'>pavanreddy2809@gmail.com</a></p>
                  <p><a href='https://www.linkedin.com/in/pavan-kumar-reddy-3939921a7/'><button className="button">Connect us on LinkedIn</button></a></p>
                </div>
              </div>
            </div>
    
            <div className="column">
              <div className="card">
                <div className="container">
                  <h2>Leela Krishna</h2>
                  <p className="title">Full stack developer</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p><a href='mailto:leelakrishna24032004@gmail.com'>leelakrishna24032004@gmail.com</a></p>
                  <p><a href='https://www.linkedin.com/in/leela-krishna-garapati-0a317724b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'><button className="button">Connect us on LinkedIn</button></a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
export default About;