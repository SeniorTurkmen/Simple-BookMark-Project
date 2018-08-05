// Form Gönderimini Dinle
document.getElementById('formum').addEventListener('submit', isaretciKaydet);

// İşaretçi Kaydet
function isaretciKaydet(e){
  // Form değerlerini al
  var siteAdi =document.getElementById('siteAdi').value;
  var siteUrl =document.getElementById('siteUrl').value;

  if(!formDogrulama(siteAdi, siteUrl)){
    return false;
  }

  var isaretci = {
    ad: siteAdi,
    url: siteUrl
  }

  /*
    // Yerel Depo Testi
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  // İşaretci kontrolü
  if(localStorage.getItem('isaretciler') === null){
    // Init dizisi
    var isaretciler = [];
    // Diziye ekle
    isaretciler.push(isaretci);
    // Yereldepoya ata
    localStorage.setItem('isaretciler', JSON.stringify(isaretciler));
  } else {
    // İşaretçiyi yereldepodan al
    var isaretciler = JSON.parse(localStorage.getItem('isaretciler'));
    // İşaretçiyi diziye ekle
    isaretciler.push(isaretci);
    // İşaretçiyi tekrar depoya ata
    localStorage.setItem('isaretciler', JSON.stringify(isaretciler));
  }

  // Formu temizle
  document.getElementById('formum').reset();

  // İşaretçiyi tekrar getir
  isaretciGetir();

  // Formun gönderilmesini önle
  e.preventDefault();
}

// İşaretçi sil
function isaretciSil(url){
    // İşaretçiyi yereldepodan al
    var isaretciler = JSON.parse(localStorage.getItem('isaretciler'));
    // İşaretçileri gez
    for(var i =0;i < isaretciler.length;i++){
      if(isaretciler[i].url == url){
        // Diziden kaldır
        isaretciler.splice(i, 1);
      }
    }
    // İşaretçiyi yeniden depoya ata
    localStorage.setItem('isaretciler', JSON.stringify(isaretciler));
  
    // İşaretçiyi tekrar getir
    isaretciGetir();
  }

// İşaretçiyi getir
function isaretciGetir(){
  // İşaretçiyi yereldepodan al
  var isaretciler = JSON.parse(localStorage.getItem('isaretciler'));
  // Çıkış İdlerini al
  var isaretciSonuclari = document.getElementById('isaretciSonuclari');

  // Çıkış Düzenle
  isaretciSonuclari.innerHTML = '';
  for(var i = 0; i < isaretciler.length; i++){
    var ad = isaretciler[i].ad;
    var url = isaretciler[i].url;

    isaretciSonuclari.innerHTML += '<div class="well">'+
                                  '<h3>'+ad+
                                  ' <a class="btn btn-default" target="_blank" href="'+httpEkle(url)+'">Siteye Git</a> ' +
                                  ' <a onclick="isaretciSil(\''+url+'\')" class="btn btn-danger" href="#">Sil</a> ' +
                                  '</h3>'+
                                  '</div>';
  }
}

// Formu Doğrula
function formDogrulama(siteAdi, siteUrl){
  if(!siteAdi || !siteUrl){
    alert('Lütfen formu doldurunuz');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Lütfen gaçerli bir değer giriniz...');
    return false;
  }

  return true;
}

function httpEkle(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}