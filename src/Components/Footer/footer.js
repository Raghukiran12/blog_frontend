
import React from "react";
import './footerstyles.css'

const Footer = () => {
	return (
		<footer class="footer-distributed">

			<div class="footer-left">

				<h3>ZIP<span>Thought</span></h3>

				<p class="footer-links">
					<a href="#" class="link-1">Home</a>
				
					<a href="#">About</a>
					
					<a href="#">Faq</a>
					
					<a href="#">Contact</a>
				</p>

				<p class="footer-company-name">ZIPThought © 2023</p>
			</div>

			<div class="footer-center">

				<div>
					<i class="fa fa-map-marker"></i>
					<p><span>VIT-AP University, </span> Amaravathi, India</p>
				</div>

				<div>
					<i class="fa fa-phone"></i>
					<p>+91 0123456789</p>
				</div>

				<div>
					<i class="fa fa-envelope"></i>
					<p><a href="mailto:bloggingwebsite@gamil.com">bloggingwebsite@gamil.com</a></p>
				</div>

			</div>

			<div class="footer-right">

				<p class="footer-company-about">
					<span>About the company</span>
					ZipThought is an open blogging platform where users pen down their thought-provoking perspectives ensuring a rich and varied experience.
				</p>

				<div class="footer-icons">

					<a href="#"><i class="fa fa-facebook"></i></a>
					<a href="#"><i class="fa fa-twitter"></i></a>
					<a href="#"><i class="fa fa-linkedin"></i></a>
					<a href="#"><i class="fa fa-github"></i></a>

				</div>

			</div>

		</footer>
	);
};
export default Footer;