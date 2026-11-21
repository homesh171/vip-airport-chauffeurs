import React, { useState } from 'react';
import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ArrowUpRight, Plane, Clock3, ShieldCheck, MapPin, Users, BriefcaseBusiness, CarFront, CheckCircle2, ChevronDown, MessageCircle, Mail, Phone, ChevronRight } from 'lucide-react';

const PHONE = '447366832296';
const EMAIL = 'info@vipairportchaufferus.com';
const PARTNER = 'partner@vipairportchaufferus.com';
const wa = (message='Hello VIP Airport Chauffeurs, I would like to enquire about an airport transfer.') => `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
const heroImg = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85';
const fleet = [
  {name:'Saloon', desc:'A comfortable choice for everyday airport journeys.', seats:'Up to 3 passengers', bags:'2 large suitcases', img:'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=82'},
  {name:'Estate', desc:'Extra luggage space without compromising comfort.', seats:'Up to 4 passengers', bags:'3 large suitcases', img:'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=82'},
  {name:'Executive', desc:'A refined option for business and special journeys.', seats:'Up to 3 passengers', bags:'2 large suitcases', img:'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=82'},
  {name:'MPV / 6 Seater', desc:'More room for families, groups and extra luggage.', seats:'Up to 6 passengers', bags:'4 large suitcases', img:'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1000&q=82'}
];
const airports = ['Heathrow (LHR)','Gatwick (LGW)','Stansted (STN)','Luton (LTN)','London City (LCY)','Southend (SEN)'];
const services = [
  {icon:Plane,title:'Airport transfers',desc:'Pre-arranged journeys to and from major UK airports, with your pickup details confirmed in advance.'},
  {icon:BriefcaseBusiness,title:'Business travel',desc:'Straightforward transport for meetings, corporate visits and business trips.'},
  {icon:CarFront,title:'Private chauffeur journeys',desc:'Comfortable point-to-point travel for occasions, hotels and personal journeys.'},
  {icon:Users,title:'Group and family travel',desc:'Practical vehicle options for passengers travelling together with luggage.'}
];
function Header(){const [open,setOpen]=useState(false);const loc=useLocation();React.useEffect(()=>setOpen(false),[loc]);return <header className="header"><div className="container nav"><Link to="/" className="brand"><span className="brand-mark">VIP</span><span className="brand-copy">AIRPORT <b>CHAUFFEURS</b></span></Link><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button><nav className={open?'nav-links open':'nav-links'}><a href="/#services">Services</a><a href="/#fleet">Our fleet</a><a href="/#airports">Airports</a><a href="/#about">About</a><a href="/#partners">Partners</a><a href="/#contact">Contact</a><a className="nav-cta" href="/#quote">Get a quote <ArrowUpRight size={16}/></a></nav></div></header>}
function Footer(){return <footer className="footer"><div className="container footer-grid"><div><Link to="/" className="brand footer-brand"><span className="brand-mark">VIP</span><span className="brand-copy">AIRPORT <b>CHAUFFEURS</b></span></Link><p className="footer-about">Airport journeys made easier. Tell us where you need to go and our team will help with your transfer enquiry.</p><a className="footer-whatsapp" href={wa()} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Chat with us on WhatsApp</a></div><div><h4>Explore</h4><a href="/#services">Our services</a><a href="/#fleet">Our fleet</a><a href="/#airports">Airport transfers</a><a href="/#partners">Partner with us</a></div><div><h4>Information</h4><Link to="/terms">Terms &amp; Conditions</Link><Link to="/privacy">Privacy Policy</Link><a href="mailto:partner@vipairportchaufferus.com">Partner enquiries</a></div><div><h4>Get in touch</h4><a href="mailto:info@vipairportchaufferus.com"><Mail size={16}/> info@vipairportchaufferus.com</a><a href="https://wa.me/447366832296" target="_blank" rel="noreferrer"><MessageCircle size={16}/> +44 7366 832296</a><span className="footer-note">For quotes, message us on WhatsApp.</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} VIP Airport Chauffeurs. All rights reserved.</span><span>Designed for easy, reliable journeys.</span></div></footer>}
function WhatsAppFloat(){return <a className="wa-float" href={wa()} target="_blank" rel="noreferrer" aria-label="Chat with VIP Airport Chauffeurs on WhatsApp"><MessageCircle/><span>WhatsApp us</span></a>}

function LocationInput({ label, name, value, onChange, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = import.meta.env.VITE_LOCATIONIQ_TOKEN;

  useEffect(() => {
    if (!token || value.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const url = new URL(
          "https://api.locationiq.com/v1/autocomplete"
        );

        url.search = new URLSearchParams({
          key: token,
          q: value,
          limit: "5",
          countrycodes: "gb",
          format: "json",
          dedupe: "1"
        }).toString();

        const response = await fetch(url, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("Location search failed");
        }

        const data = await response.json();
        setSuggestions(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.name !== "AbortError") {
          setSuggestions([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value, token]);

  return (
    <label className="wide location-label">
      {label} <em>*</em>

      <div className="location-input-wrap">
        <input
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            onSelect(false);
          }}
          placeholder="Search UK postcode, airport or address"
          autoComplete="off"
          required
        />

        {loading && (
          <span className="location-loading">Searching...</span>
        )}

        {suggestions.length > 0 && (
          <div className="location-suggestions">
            {suggestions.map((place) => (
              <button
                type="button"
                key={place.place_id}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(place.display_name);
                  onSelect(true);
                  setSuggestions([]);
                }}
              >
                <MapPin size={17} />
                <span>{place.display_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </label>
  );
}


function QuoteForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: '1',
    vehicle: 'Saloon',
    flight: ''
  });

  const [pickupSelected, setPickupSelected] = useState(false);
  const [destinationSelected, setDestinationSelected] = useState(false);
  const [error, setError] = useState('');

  const update = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.date ||
      !form.time
    ) {
      setError('Please complete all required fields.');
      return;
    }

    if (!pickupSelected || !destinationSelected) {
      setError('Please select both pickup and destination from the location suggestions.');
      return;
    }

    setError('');

    const msg = `Hello VIP Airport Chauffeurs, I would like a quotation.

Name: ${form.name}
Contact number: ${form.phone}
Pickup: ${form.pickup}
Destination: ${form.destination}
Date: ${form.date}
Pickup time: ${form.time}
Passengers: ${form.passengers}
Vehicle: ${form.vehicle}
Flight number: ${form.flight || 'Not provided'}`;

    window.open(wa(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <form className="quote-form" onSubmit={submit}>
      <div className="form-heading">
        <span className="eyebrow">PLAN YOUR JOURNEY</span>
        <h3>Get your free quote</h3>
        <p>Share a few details and continue to WhatsApp to send your request.</p>
      </div>

      <div className="form-grid">
        <label>
          Full name <em>*</em>
          <input
            name="name"
            value={form.name}
            onChange={e => update('name', e.target.value)}
            placeholder="Your name"
            required
            autoComplete="name"
          />
        </label>

        <label>
          Contact number <em>*</em>
          <input
            name="phone"
            value={form.phone}
            onChange={e => update('phone', e.target.value)}
            placeholder="+44..."
            required
            autoComplete="tel"
          />
        </label>

        <LocationInput
          label="Pickup location"
          name="pickup"
          value={form.pickup}
          onChange={value => update('pickup', value)}
          onSelect={setPickupSelected}
        />

        <LocationInput
          label="Destination"
          name="destination"
          value={form.destination}
          onChange={value => update('destination', value)}
          onSelect={setDestinationSelected}
        />

        <label>
          Travel date <em>*</em>
          <input
            type="date"
            name="date"
            min={new Date().toISOString().slice(0, 10)}
            value={form.date}
            onChange={e => update('date', e.target.value)}
            required
          />
        </label>

        <label>
          Pickup time <em>*</em>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={e => update('time', e.target.value)}
            required
          />
        </label>

        <label>
          Passengers
          <select
            name="passengers"
            value={form.passengers}
            onChange={e => update('passengers', e.target.value)}
          >
            {[1,2,3,4,5,6,7,8].map(n => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>

        <label>
          Vehicle preference
          <select
            name="vehicle"
            value={form.vehicle}
            onChange={e => update('vehicle', e.target.value)}
          >
            {fleet.map(v => (
              <option key={v.name}>{v.name}</option>
            ))}
          </select>
        </label>

        <label className="wide">
          Flight number <span className="optional">(optional)</span>
          <input
            name="flight"
            value={form.flight}
            onChange={e => update('flight', e.target.value)}
            placeholder="e.g. BA123"
          />
        </label>
      </div>

      {error && <p className="form-error">{error}</p>}

      <button className="button button-primary submit-button" type="submit">
        Get a quote on WhatsApp <ArrowUpRight size={18} />
      </button>

      <p className="form-privacy">
        By continuing, WhatsApp will open with your journey details ready to send.
        Your request is not submitted until you press Send in WhatsApp.
      </p>
    </form>
  );
}

function Home(){return <><section className="hero" style={{'--hero-image':`url(${heroImg})`}}><div className="hero-shade"/><div className="container hero-content"><span className="eyebrow light">AIRPORT TRANSFERS • PRIVATE CHAUFFEUR</span><h1>Your journey.<br/><span>Made easier.</span></h1><p>Comfortable, dependable airport transfers with a simple way to request your quote.</p><div className="hero-actions"><a href="#quote" className="button button-primary">Get a quote <ArrowRight size={18}/></a><a href="#services" className="button button-outline">Explore our services</a></div><div className="hero-points"><span><CheckCircle2/> Simple booking</span><span><CheckCircle2/> Helpful support</span><span><CheckCircle2/> Vehicle choice</span></div></div><div className="hero-label">TRAVEL WITH CONFIDENCE</div></section>
<section className="quick-strip"><div className="container quick-grid"><div><Plane/><span><b>Airport connections</b><small>Major London airports</small></span></div><div><Clock3/><span><b>Pre-arranged journeys</b><small>Plan your pickup ahead</small></span></div><div><ShieldCheck/><span><b>Clear communication</b><small>Speak with our team</small></span></div><div><MessageCircle/><span><b>Easy quote requests</b><small>Continue directly on WhatsApp</small></span></div></div></section>
<section className="section" id="services"><div className="container"><div className="section-head"><div><span className="eyebrow">WHAT WE DO</span><h2>Travel that works<br/>around you.</h2></div><p>From airport pickups to business journeys, we make arranging your transport straightforward. Choose the service you need and contact us for a tailored quote.</p></div><div className="service-grid">{services.map((s,i)=><article className="service-card" key={s.title}><span className="service-icon"><s.icon/></span><span className="card-number">0{i+1}</span><h3>{s.title}</h3><p>{s.desc}</p><a href="#quote" className="text-link">Request a quote <ArrowUpRight size={16}/></a></article>)}</div></div></section>
<section className="section fleet-section" id="fleet"><div className="container"><div className="section-head"><div><span className="eyebrow">TRAVEL YOUR WAY</span><h2>Choose the right<br/>vehicle for you.</h2></div><p>Whether you are travelling alone, with family or with colleagues, we offer a choice of vehicle categories to suit different journey needs. Availability is confirmed when you enquire.</p></div><div className="fleet-grid">{fleet.map(v=><article className="fleet-card" key={v.name}><div className="fleet-image"><img src={v.img} alt={`${v.name} vehicle`} loading="lazy"/></div><div className="fleet-info"><h3>{v.name}</h3><p>{v.desc}</p><div className="fleet-meta"><span><Users size={15}/>{v.seats}</span><span><BriefcaseBusiness size={15}/>{v.bags}</span></div><a href="#quote" className="text-link">Enquire about this vehicle <ArrowUpRight size={16}/></a></div></article>)}</div><p className="small-note">Passenger and luggage capacities are indicative only and depend on the vehicle supplied. Please confirm your requirements when requesting a quote.</p></div></section>
<section className="airport-section" id="airports"><div className="container airport-layout"><div><span className="eyebrow light">LONDON &amp; BEYOND</span><h2>Airport transfers<br/>made simple.</h2><p>We can help arrange journeys to and from key airports serving London. Share your flight and destination details when requesting your quote.</p><a href="#quote" className="button button-light">Plan your transfer <ArrowRight size={17}/></a></div><div className="airport-list">{airports.map((a,i)=><div key={a}><span className="airport-code">{a.match(/\((.*?)\)/)?.[1]}</span><b>{a.split(' (')[0]}</b><ArrowUpRight size={17}/></div>)}</div></div></section>
<section className="section about-section" id="about"><div className="container about-grid"><div className="about-image"><img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=85" alt="Comfortable modern car interior" loading="lazy"/><div className="image-note"><b>Every journey starts with a conversation.</b><span>Tell us what you need and we’ll help with the next step.</span></div></div><div className="about-copy"><span className="eyebrow">A BETTER WAY TO ARRANGE YOUR RIDE</span><h2>Good journeys<br/>start with good service.</h2><p>At VIP Airport Chauffeurs, we believe arranging your journey should be clear and convenient. Our approach is simple: understand your travel plans, help you choose a suitable option and keep communication straightforward.</p><div className="benefit-list"><div><CheckCircle2/><span><b>Simple enquiries</b><small>Send your journey details in a few easy steps.</small></span></div><div><CheckCircle2/><span><b>Options to suit your trip</b><small>Choose from a range of vehicle categories.</small></span></div><div><CheckCircle2/><span><b>Direct communication</b><small>Discuss your requirements with our team.</small></span></div></div><a href="#quote" className="text-link">Talk to our team <ArrowUpRight size={16}/></a></div></div></section>
<section className="section quote-section" id="quote"><div className="container quote-layout"><div className="quote-intro"><span className="eyebrow">READY WHEN YOU ARE</span><h2>Where can we<br/>take you?</h2><p>Complete the form with your journey details. When you select the button, WhatsApp will open with your information ready to send to our team.</p><div className="quote-contact"><div><MessageCircle/><span><b>WhatsApp</b><small>+44 7366 832296</small></span></div><div><Mail/><span><b>Email</b><small>info@vipairportchaufferus.com</small></span></div></div><p className="quote-disclaimer">Submitting the form opens WhatsApp; it does not automatically send your message or confirm a booking. We will respond to discuss availability and pricing.</p></div><QuoteForm/></div></section>
<section className="section partner-section" id="partners"><div className="container partner-box"><div><span className="eyebrow light">WORK WITH US</span><h2>Interested in<br/>becoming a partner?</h2><p>We welcome enquiries from travel companies, booking platforms and transport partners interested in working with VIP Airport Chauffeurs.</p><a className="button button-light" href={`mailto:${PARTNER}?subject=${encodeURIComponent('Partner Application - VIP Airport Chauffeurs')}&body=${encodeURIComponent('Hello VIP Airport Chauffeurs,\n\nI am interested in applying to become a partner.\n\nBusiness name:\nContact name:\nPhone number:\nWebsite (if applicable):\nBrief introduction:\n\nKind regards,')}`}>Apply by email <ArrowUpRight size={17}/></a></div><div className="partner-aside"><div className="partner-symbol"><Users/></div><h3>Partner enquiries</h3><p>Send us a short introduction about your business and how you would like to work together.</p><a href={`mailto:${PARTNER}`}>{PARTNER} <ArrowUpRight size={15}/></a><small>Partner applications are reviewed by our team. This page is an enquiry route, not a live partner account portal.</small></div></div></section>
<section className="section faq-section"><div className="container faq-layout"><div><span className="eyebrow">NEED TO KNOW</span><h2>Frequently asked<br/>questions.</h2><p>Have another question? Contact our team and we'll be happy to help.</p><a href={`mailto:${EMAIL}`} className="text-link">Email our team <ArrowUpRight size={16}/></a></div><div className="faq-list">{[['How do I get a quote?','Complete the quote form on this page. WhatsApp will open with your journey details ready for you to send. Our team can then discuss your request.'],['Does submitting the form confirm my booking?','No. Sending an enquiry is not a booking confirmation. Your journey is only confirmed after availability, price and arrangements have been agreed with our team.'],['Which airports do you cover?','You can enquire about transfers to and from Heathrow, Gatwick, Stansted, Luton, London City and Southend airports. Please contact us to discuss your specific route.'],['Can I request a particular vehicle?','Yes. Select your preferred vehicle category in the quote form. The exact vehicle and availability will be confirmed when we respond.'],['How do I apply to become a partner?','Use the Partner section and select Apply by email. This will open an email addressed to partner@vipairportchaufferus.com.'],['What if I need to change my journey?','Please contact us as soon as possible by replying to your booking conversation or emailing our team. Any change is subject to confirmation.']].map(([q,a])=><details key={q}><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</div></div></section>
<section className="contact-band" id="contact"><div className="container contact-band-inner"><div><span className="eyebrow light">LET'S GET YOU MOVING</span><h2>Have a journey in mind?</h2><p>Get in touch and tell us where you need to go.</p></div><a className="button button-light" href={wa()} target="_blank" rel="noreferrer">Message us on WhatsApp <ArrowUpRight size={17}/></a></div></section></>}

const privacySections = [
  {
    title: "1. Who We Are",
    text: `VIP Airport Chauffeurs provides private hire and airport transfer services. This Privacy Policy explains how we collect, use, store and protect personal information when you visit our website, contact us or request a quotation or booking.

Website: www.vipairportchaufferus.com
Email: info@vipairportchaufferus.com
WhatsApp: +44 7366 832296`
  },
  {
    title: "2. Information We Collect",
    text: `We may collect personal information that you provide directly, including your name, telephone number, email address, pickup location, destination, travel date and time, passenger numbers, vehicle requirements and flight details.

We may also collect information you provide when contacting us through WhatsApp, email or other communication channels.`
  },
  {
    title: "3. Information Submitted Through Our WhatsApp Booking Form",
    text: `When you complete a quotation or booking form on our website and select the WhatsApp option, the information you enter is used to prepare a message and open WhatsApp so that you can send your enquiry to us.

Your message is not automatically submitted to a website database by our form. Information you send through WhatsApp is handled by WhatsApp and is also received by us for the purpose of responding to your enquiry.`
  },
  {
    title: "4. How We Use Your Information",
    text: `We may use your information to respond to enquiries, prepare quotations, confirm and manage bookings, arrange transport services, communicate journey updates, contact you about changes or delays, handle complaints and meet our legal obligations.`
  },
  {
    title: "5. Lawful Basis for Processing",
    text: `Depending on the circumstances, we process personal information because it is necessary to take steps at your request before entering into a contract, perform a contract with you, comply with a legal obligation, or pursue our legitimate business interests. Where consent is required, we will ask for it.`
  },
  {
    title: "6. Sharing Your Information",
    text: `We may share relevant booking information with drivers or service providers where necessary to provide your journey. We may also share information with technology, website hosting, email or communication providers, and public authorities where required by law.

We do not sell your personal information.`
  },
  {
    title: "7. WhatsApp Communications",
    text: `If you contact us or submit a booking enquiry through WhatsApp, your information will be processed by WhatsApp in accordance with its own privacy policy and terms. We recommend reviewing WhatsApp's privacy information before using the service.`
  },
  {
    title: "8. Mapping and Location Services",
    text: `Our website may use mapping, address search or location-related services to help you enter pickup and destination details. Information entered into these services may be processed by the relevant third-party provider under its own privacy policy.`
  },
  {
    title: "9. How Long We Keep Your Information",
    text: `We retain personal information only for as long as reasonably necessary for the purposes described in this policy, including managing enquiries and bookings, maintaining business records, resolving disputes and meeting legal or accounting requirements.`
  },
  {
    title: "10. Data Security",
    text: `We take reasonable technical and organisational measures to protect personal information against unauthorised access, loss, misuse, alteration or disclosure. However, no method of transmitting or storing information online can be guaranteed to be completely secure.`
  },
  {
    title: "11. Your Data Protection Rights",
    text: `Depending on applicable data protection law, you may have the right to request access to your personal information, request correction or deletion, object to certain processing, request restriction of processing, request data portability or withdraw consent where processing is based on consent.`
  },
  {
    title: "12. Privacy Requests",
    text: `To make a privacy or data protection request, contact us at info@vipairportchaufferus.com. We may need to verify your identity before responding.`
  },
  {
    title: "13. Cookies",
    text: `Our website may use cookies or similar technologies that are necessary for the website to function or that help us understand website usage. You can manage cookies through your browser settings. Disabling certain cookies may affect website functionality.`
  },
  {
    title: "14. Third-Party Websites and Services",
    text: `Our website may contain links to third-party websites or use third-party services. We are not responsible for the privacy practices or content of those third parties. You should review their privacy policies separately.`
  },
  {
    title: "15. Children's Privacy",
    text: `Our website and services are not intended to collect personal information directly from children. If you believe a child has provided personal information to us, please contact us so that we can review the matter.`
  },
  {
    title: "16. Changes to This Privacy Policy",
    text: `We may update this Privacy Policy from time to time to reflect changes to our services, website or legal requirements. Any updated version will be published on this page with a revised date where appropriate.`
  },
  {
    title: "17. Contact Us",
    text: `If you have any questions about this Privacy Policy or how we handle your personal information, please contact:

VIP Airport Chauffeurs
Email: info@vipairportchaufferus.com
Website: www.vipairportchaufferus.com
WhatsApp: +44 7366 832296`
  }
];

const termsSections = [
  {
    title: "1. About VIP Airport Chauffeurs",
    text: `VIP Airport Chauffeurs provides pre-booked private hire and airport transfer services for passengers travelling to and from London airports and other agreed locations.

Our services may include transfers to and from Heathrow, Gatwick, Stansted, Luton, London City and Southend airports, as well as other destinations agreed at the time of booking.`
  },
  {
    title: "2. Definitions",
    text: `For the purposes of these Terms:

• "Company", "we", "us" or "our" means VIP Airport Chauffeurs.
• "Customer", "you" or "your" means the person making or requesting a booking.
• "Passenger" means any person travelling as part of the booking.
• "Driver" means the driver assigned to provide the booked transfer.
• "Booking" means a request for a transfer or private hire service.
• "Confirmation" means the booking confirmation issued by VIP Airport Chauffeurs.`
  },
  {
    title: "3. Booking Procedure",
    text: `A booking request may be submitted through our website, telephone, WhatsApp, email or another communication method made available by VIP Airport Chauffeurs.

A booking is not considered confirmed until VIP Airport Chauffeurs has accepted the request and provided confirmation of the relevant journey details.

Customers are responsible for checking their booking confirmation and ensuring that all information is correct, including passenger name and contact details, pickup location, destination, date and time, airport and terminal information, flight number where applicable, number of passengers and luggage requirements.

Incorrect or incomplete information supplied by the customer may affect our ability to provide the service and may result in additional charges or cancellation where the service cannot reasonably be provided.`
  },
  {
    title: "4. Customer Responsibility",
    text: `Customers must provide accurate and complete booking information. You are responsible for checking your confirmation before the journey and notifying us promptly of any errors.

Customers are also responsible for ensuring that the selected pickup time allows sufficient time to reach their destination, including appropriate allowance for airport check-in, security, traffic and other potential delays.

VIP Airport Chauffeurs cannot guarantee a specific arrival time where delays are caused by traffic, road closures, weather, accidents, airport conditions or other circumstances outside our reasonable control.`
  },
  {
    title: "5. Airport Transfers & Flight Information",
    text: `Where a flight number is provided, we may use available flight information to assist with monitoring the scheduled arrival.

Customers remain responsible for providing the correct flight number and ensuring that their booking information is accurate.

Flight delays, cancellations, diversions and schedule changes should be communicated to VIP Airport Chauffeurs as soon as reasonably possible.

For airport pickups, waiting arrangements may be affected by flight status, airport access rules, parking requirements and the particular booking.`
  },
  {
    title: "6. Waiting Time",
    text: `Customers should be ready at the agreed pickup location at the confirmed pickup time.

For standard non-airport pickups, the driver will normally wait up to 10 minutes after the agreed pickup time without an additional waiting charge, unless different arrangements were confirmed with the customer.

After the included waiting period, a £5 waiting fee may apply. Additional waiting may be charged at £1 per 5 minutes, depending on the booking and circumstances.

Where the customer requests or causes the driver to wait beyond the included period, additional waiting charges may apply.

The applicable waiting arrangement may differ for airport pickups.`
  },
  {
    title: "7. Airport Waiting & Pickup",
    text: `Airport pickups are subject to airport rules, access arrangements and parking requirements. Waiting time may differ from standard street or residential pickups.

Where a flight number is supplied, VIP Airport Chauffeurs may monitor available flight information. This does not guarantee that the driver can wait indefinitely or that airport parking or access charges will not apply.

Where applicable, airport parking or access charges may be added to the fare if they are incurred in providing the service and were not already included in the quoted price.`
  },
  {
    title: "8. No-Show",
    text: `A customer may be considered a no-show where they fail to attend the agreed pickup location, cannot reasonably be contacted, or do not respond to reasonable attempts by the driver or VIP Airport Chauffeurs to establish contact.

Where the driver has attended the agreed pickup location and the applicable waiting period has expired, up to 100% of the booking fare may be charged, subject to applicable law and the specific booking terms.`
  },
  {
    title: "9. Changes to a Booking",
    text: `Customers should contact VIP Airport Chauffeurs as soon as possible if they need to change a booking.

Changes to the pickup time, pickup location, destination, passenger numbers, luggage requirements or other journey details are subject to availability and may result in a change to the price.

We cannot guarantee that changes requested shortly before the scheduled pickup time can be accommodated.`
  },
  {
    title: "10. Cancellation Policy",
    text: `Unless different cancellation terms were specifically agreed and communicated for the booking, the following general cancellation schedule may apply:

• More than 24 hours before pickup: cancellation may be made free of charge.
• Between 2 and 24 hours before pickup: a cancellation charge of 25% of the booking fare may apply.
• Less than 2 hours before pickup: a cancellation charge of 50% of the booking fare may apply.
• No-show or cancellation after the driver has arrived: up to 100% of the booking fare may be charged.

The applicable cancellation charge will always be subject to applicable consumer and other legal requirements.`
  },
  {
    title: "11. Refunds",
    text: `Where a refund is approved, the amount refunded will depend on the applicable cancellation terms and the circumstances of the booking.

Eligible cancellations may receive 100% of the amount paid, excluding any clearly disclosed non-refundable charges.

Where a partial refund applies, the refund percentage will depend on the applicable cancellation period and booking terms.

Refunds will normally be returned to the original payment method used for the booking, where practicable.`
  },
  {
    title: "12. Driver No-Show Policy",
    text: `If our driver fails to arrive for a confirmed booking without contacting the customer or providing a reasonable alternative, the customer will not be charged for the journey.

If the customer has already made payment, they will be eligible for a 100% refund of the booking fare.

Where appropriate, VIP Airport Chauffeurs will make reasonable efforts to arrange an alternative vehicle.

If an alternative vehicle cannot be provided within a reasonable time, the customer may cancel the booking without a cancellation fee.

This policy does not apply where the driver is delayed due to circumstances outside our reasonable control, such as severe traffic, road closures, accidents, extreme weather, airport disruption or other unforeseen events.`
  },
  {
    title: "13. Fares & Payment",
    text: `The applicable fare will be communicated to the customer before or during confirmation of the booking.

Payment may be required in advance for certain bookings. Accepted payment methods will be stated at the time of booking.

Unless otherwise agreed, the customer is responsible for paying the agreed fare and any additional charges properly applicable to the service.

Additional charges may apply for waiting time, airport parking or access charges, tolls, additional stops, changes requested by the customer, or other agreed extras.`
  },
  {
    title: "14. Luggage",
    text: `Customers must ensure that the amount and size of luggage is suitable for the vehicle booked.

If the amount of luggage exceeds the vehicle's available capacity, we may need to arrange a different vehicle or alternative transportation.`
  },
  {
    title: "15. Child Seats",
    text: `Child-seat availability should be requested at the time of booking.

Where a suitable child seat is not available, the customer should contact VIP Airport Chauffeurs before the journey to discuss available options.`
  },
  {
    title: "16. Vehicle & Driver",
    text: `We aim to provide the vehicle type agreed at the time of booking. However, in circumstances such as mechanical problems, operational requirements or other unforeseen events, we may provide a suitable alternative vehicle.

Drivers may be employees, contractors or appropriately licensed service providers engaged to fulfil a booking.`
  },
  {
    title: "17. Passenger Conduct",
    text: `Passengers must behave respectfully towards drivers and other passengers and must comply with reasonable safety instructions.

Smoking or any behaviour that creates a safety risk, damages the vehicle or seriously disrupts the journey is not permitted.`
  },
  {
    title: "18. Lost Property",
    text: `Customers are responsible for checking the vehicle and collecting their belongings before leaving.

If an item is left behind, please contact VIP Airport Chauffeurs as soon as possible. We will make reasonable efforts to locate and return lost property where practicable.`
  },
  {
    title: "19. Delays & Events Outside Our Control",
    text: `We will make reasonable efforts to provide the booked service at the agreed time.

However, we are not responsible for delays or failure to perform caused by circumstances beyond our reasonable control, including severe weather, traffic congestion, accidents, road closures, vehicle breakdowns, airport disruption, strikes, emergencies, government restrictions or other unforeseen events.`
  },
  {
    title: "20. Safety & Legal Requirements",
    text: `All passengers must comply with applicable laws and reasonable safety requirements during the journey.

The driver may refuse requests that would cause the driver to breach traffic, licensing or other applicable legal requirements.`
  },
  {
    title: "21. Complaints",
    text: `We want customers to have a positive experience. If you have a complaint about a journey, please contact VIP Airport Chauffeurs as soon as reasonably possible and provide the relevant booking details.

We will review complaints fairly and make reasonable efforts to resolve legitimate issues.`
  },
  {
    title: "22. Legal Protection & Liability",
    text: `Nothing in these Terms & Conditions excludes or limits any liability that cannot legally be excluded or limited under applicable law.

Nothing in these Terms is intended to remove or restrict a customer's statutory consumer rights or any protection that applies under mandatory UK law.

Subject to applicable law, VIP Airport Chauffeurs will not be responsible for indirect or consequential losses arising from circumstances outside our reasonable control.`
  },
  {
    title: "23. Website Information",
    text: `We aim to keep the information on our website accurate and up-to-date. However, service availability, prices, vehicle availability and other information may change.`
  },
  {
    title: "24. Intellectual Property",
    text: `Unless otherwise stated, the text, branding, logos, graphics, design and other original content appearing on the VIP Airport Chauffeurs website belong to VIP Airport Chauffeurs or are used with appropriate permission.`
  },
  {
    title: "25. Privacy & Personal Data",
    text: `Personal information provided when making an enquiry or booking is handled in accordance with our Privacy Policy.

Information may be used where reasonably necessary to communicate with customers, arrange and provide booked services, manage bookings, respond to enquiries and meet applicable legal obligations.`
  },
  {
    title: "26. Third-Party Services",
    text: `Our website may use third-party services or communication platforms, including WhatsApp, mapping services, hosting providers, email providers or other technology services.`
  },
  {
    title: "27. Amendments to These Terms",
    text: `VIP Airport Chauffeurs may update these Terms & Conditions from time to time to reflect changes to our services, website or legal requirements.`
  },
  {
    title: "28. Severability",
    text: `If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue to apply to the extent permitted by law.`
  },
  {
    title: "29. Governing Law",
    text: `These Terms & Conditions are intended to operate in accordance with the laws applicable to the provision of our services in England and Wales, subject to any mandatory consumer rights and legal requirements that apply to a particular customer or transaction.`
  },
  {
    title: "30. Contact Us",
    text: `If you have questions about these Terms & Conditions or your booking, please contact us.

Business: VIP Airport Chauffeurs
Email: info@vipairportchaufferus.com
Website: www.vipairportchaufferus.com
WhatsApp: +44 7366 832296`
  }
];

function Legal({ privacy = false }) {
  const sections = privacy ? privacySections : termsSections;

  return (
    <main className="legal-page">
      <div className="legal-container">
        <p className="legal-eyebrow">VIP AIRPORT CHAUFFEURS</p>
        <h1>{privacy ? "Privacy Policy" : "Terms & Conditions"}</h1>
        <p className="legal-intro">
          {privacy
            ? "Your privacy matters to us. This policy explains how VIP Airport Chauffeurs handles your personal information."
            : "Please read these terms carefully before requesting or booking a journey with VIP Airport Chauffeurs."}
        </p>

        <div className="legal-updated">
          Last updated: 21 November 2026
        </div>

        {sections.map((section, index) => (
          <section className="legal-section" key={index}>
            <h2>{section.title}</h2>
            <div className="legal-section-text">
              {section.text.split("\n").map((line, lineIndex) => (
                <p key={lineIndex}>
                  {line.split(/(\*\*.*?\*\*)/g).map((part, partIndex) =>
                    part.startsWith("**") && part.endsWith("**")
                      ? <strong key={partIndex}>{part.slice(2, -2)}</strong>
                      : part
                  )}
                </p>
              ))}
            </div>
          </section>
        ))}

        <div className="legal-contact">
          <h2>Contact VIP Airport Chauffeurs</h2>
          <p>
            Email:{" "}
            <a href="mailto:info@vipairportchaufferus.com">
              info@vipairportchaufferus.com
            </a>
          </p>
          <p>
            WhatsApp:{" "}
            <a
              href="https://wa.me/447366832296"
              target="_blank"
              rel="noreferrer"
            >
              +44 7366 832296
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

function NotFound(){return <main className="not-found"><span>404</span><h1>We can't find that page.</h1><p>The page may have moved or the address may be incorrect.</p><Link to="/" className="button button-primary">Back to homepage <ArrowRight size={17}/></Link></main>}
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname]);

  return null;
}
export default function App(){
  const location = useLocation();

useEffect(() => {
  window.scrollTo(0, 0);
}, [location.pathname]);
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
return <><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/terms" element={<Legal/>}/><Route path="/privacy" element={<Legal privacy/>}/><Route path="*" element={<NotFound/>}/></Routes><Footer/><WhatsAppFloat/></>}
