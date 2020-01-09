import { h, Component } from 'preact';
import style from './intro.less';

export default class Intro extends Component {
	render() {

		return (
			<div>
				<h1 className={style.header}>What is GDPR?</h1>
				<p>
				The General Data Protection Regulation (GDPR) is European regulation that replaces the Data
				Protection Directive 95/46/EC, and was designed to harmonize data privacy laws across Europe,
				to protect and empower all EU citizens with regard to their data privacy and to reshape the
				way organizations across the region approach data privacy.
				</p>

				<p>
				The GDPR goes into effect May 25, 2018 and, in addition to the existing Directive 2002/58/EC
				(ePrivacy Directive) (and the proposed ePrivacy Regulation, which would replace the ePrivacy
				Directive), it will change the way companies around the world interact with individuals located
				in the EU, including the way they access, acquire, use, share, and store personal data, and how
				they provide individuals with access to their own personal data.
				</p>

				<h1 className={style.header}>What is ePrivacy?</h1>
				<p>
				The ePrivacy Directive, as amended in 2009, put in place specific requirements related to the use
				of local storage, which includes the use of cookies. Today, under local European laws that
				implemented the ePrivacy Directive, publishers must give the individuals visiting their apps,
				sites and other mediums in which they sell ad inventory information about their use of local
				storage. Many of those laws also require publishers to obtain consent to use local storage.
				Whether consent is necessary (and if it is, what is considered sufficient) may change under local
				laws. And, an update to the ePrivacy Directive, the proposed <a href="http://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:52017PC0010&from=EN">ePrivacy Regulation</a>,
				is being formulated and will likely further alter the requirements.
				</p>


				<h1 className={style.header}>What is the IAB Europe Transparency and Consent Framework and how does it work?</h1>
				<p>
				The Framework provides website operators with the following:
				<ol>
					<li>
					Allows website operators to control the vendors they wish to allow to access to their users'
					browsers/devices, and process their personal data and disclose these choices to other parties
					in the online advertising ecosystem;
					</li>

					<li>
					Allows website operators and vendors to seek user consent under the ePrivacy Directive
					(for setting cookies or similar tech and accessing info on a device) and/or the GDPR in line
					with applicable legal requirements and disseminate the consent status through the online
					advertising ecosystem;
					</li>

					<li>
					Have one place to go to:
						<ol type='a'>
							<li>Understand privacy-related disclosures about those vendors;</li>
							<li>Use those disclosures to make privacy-related disclosures to its users generally;</li>
							<li>Provide disclosures required to be provided by vendors that are Controllers to end users;</li>
							<li>Seek user consent in line with applicable legal requirements where vendors may
								require it under the ePrivacy Directive and/or GDPR for various purposes, and
							</li>
							<li>Disseminate the consent status through the online advertising ecosystem.</li>
						</ol>
					</li>
				</ol>
				</p>

				<p>
				The various pieces of the framework include:
				<ul>
					<li>A global vendor list</li>
					<li>The reference architecture (for cookie format and vendor list and related API's)</li>
					<li>A Policy that participating publishers, vendors and consent management providers (CMPs) must adhere to that covers:</li>
					<ul>
						<li>the disclosures to be made by vendors included on the global vendor list</li>
						<li>the use of the global vendor list and the reference architecture</li>
					</ul>
				</ul>
				</p>
				<p>
				The transparency and consent framework and the various standards introduced by it, including the
				standard detailed below, are a work-in-progress and currently designed to be used for testing.
				</p>

				<p>
				AppNexus is supporting and contributing to the IAB Europe Transparency and Consent Framework. Our
				adserver, SSP, and headerbidding tags will fully support the protocol in order to ingest information on
				approved vendors and user consent. We also have a proof-of-concept UI communicating with our CMP to
				demonstrate how vendor information and consent is captured and stored based on the framework.
				</p>

				<h1 className={style.header}>What is a CMP</h1>
				<p>
				Within the framework, a CMP is a company that can capture and store the consent status of a user  and
				transmit that information to downstream partners.  It is not the same as the company that surfaces the
				user interface to a user (although it can be the same).
				</p>

				<p>
				A CMP product may offer various features such as displaying of transparency and consent dialogue properly
				on various devices, vendor and consent reporting, and engaging with any vendor code on a website's page
				(including widgets and non-adtech vendors).
				</p>

				<h1 className={style.header}>Where is Vendor information and Consent Stored</h1>
				<p>
				Vendor information and consent can technically be stored anywhere as long as the information is exposed through
				the CMP API. We have implemented a reference implementation that allows for two different modes of
				consent <em>Site-Wide</em> and Global using browser cookies.
				</p>

				<strong>Site-Wide</strong>
				<p>
				Site-wide currently stores the vendor and user consent information in the website operator's first party cookie.
				The approved vendors and consent information are contained and restricted for use within that site.
				</p>

				<em>Pros</em>
				<ul>
					<li>More publisher control over which vendors they surface and allow to access sites/devices.</li>
					<li>Less risk of broad revocation of consent.</li>
				</ul>

				<em>Cons</em>
				<ul>
					<li>Transparency and consent information does not transfer across sites. Website operator must
						surface disclosures and obtain consent, where necessary, for every user themselves.</li>
					<li>Currently, no central management of end user preferences.</li>
				</ul>

				<strong>Global</strong>
				<p>
				In the global vendor and consent model multiple website operators work together to surface transparency
				information for vendors and obtain consent information, where necessary. All information is stored in a
				3rd party domain that CMP's can access. Transparency provided and consent gathered from one domain/property
				is automatically transferred to other properties that use the same CMP/3rd party domain.
				</p>

				<em>Pros</em>
				<ul>
					<li>Transparency provided and consent obtained from one party automatically transfers to everyone else in the global pool.</li>
					<li>The end user has a central place to manage vendor choice.</li>
				</ul>
			</div>
		);
	}
}
