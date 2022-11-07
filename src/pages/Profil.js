export default function Profile() {
  function redirInstagram() {
    window.open('https://instagram.com/ihsanzack', '_blank', 'noopener,noreferrer');
    // window.open.href = "https://instagram.com/ihsanzack";
  }
  function redirWhatsApps() {
    window.open.href = "https://wa.me/+6288293547354";
  }
  return <>
    <div className="container-header bg-gray-800">
      <img src="assets/icon/partner.png" alt="logo" className="logo-img" />
      <h1 className="logo-title"></h1>
      <nav className="container-navbar">
        <ul className="container-ul">

          <li
            className="liProfile"
          >
            <a href="#jasa">JASA</a>
          </li>
          <li
            className="liProfile"
          >
            <a href="mailto:ihsanzack@gmail.com">KONTAK</a>
          </li>
        </ul>
      </nav>
      <button className="btn-cta" onClick={() => { redirInstagram() }}>Follow</button>
    </div>
    <div className="container-content">
      <div className="content-1">
        <p className="title">Hello Ihsan here</p>
        <p className="description">Seorang lulusan Teknik informatika tapi masih belajar ngoding :) </p>
        <img src="/assets/icon/ihsan.jpg" alt="gambar1" className="img" />
      </div>
    </div>
    <div
      className="parallax">
      <div className="tentang">
        <p className="title">Saya ingin menjadi seorang Progamer </p>
        <p className="description">Ngoding aja dulu, jagonya nanti</p>
        <button className="btn-cta" onClick={() => { redirWhatsApps() }}>Mari Kerja Sama</button>
      </div>
      <div className="container-content">
        <div className="card" id='jasa'>
          <div className="card-item">
            <img src="assets/icon/24-hours.png" alt="icon1" className="icon" />
            <p className="title-card">Pelayanan Nonstop</p>
            <p className="description-card">Service Nonstop Ketika Anda Membutuhkan Bantuan</p>
          </div>
        </div>
        <div className="card">
          <div className="card-item">
            <img src="assets/icon/contact.png" alt="icon2" className="icon" />
            <p className=" title-card">Jasa Paling Murah</p>
            <p className="description-card">Biaya Jasa Yang Saya Berikan Pasti Murah dan Terjamin</p>
          </div>
        </div>
        <div className="card">
          <div className="card-item">
            <img src="assets/icon/rating.png" alt="icon3" className="icon" />
            <p className="title-card">648 Review</p>
            <p className="description-card">Mereka Senang bekerja sama dengan saya</p>
          </div>
        </div>
      </div>
    </div>
    <div className="footer">
      <h3><p className="title">&copy; Ihsan Zack Website 2022</p></h3>
    </div>
    {/* <script>
      function redirInstagram(){
        window.location.href = "https://instagram.com/ihsanzack";
        }
      function redirWhatsApps(){
        window.location.href = "https://wa.me/+6288293547354";
        }
    </script> */}
  </>

}