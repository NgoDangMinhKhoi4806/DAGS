function DangKy(event) {
  event.preventDefault(); // Ngăn reload trang

  // Lấy dữ liệu từ form
  const hoTen = document.getElementById("hoTen").value.trim();
  const email = document.getElementById("email").value.trim();
  const MK = document.getElementById("MK").value;
  const ngaysinh = new Date(document.getElementById("ngaysinh").value);
  const nganh = document.getElementById("nganh").value;

  // ======= KIỂM TRA MẬT KHẨU =======
  let regex = /^(?=.*[A-Za-z]).{6,}$/; 
  if (!regex.test(MK)) {
    alert("Mật khẩu phải có ít nhất 6 ký tự và chứa chữ cái!");
    return;
  }

  // ======= KIỂM TRA TUỔI >= 18 =======
  let today = new Date();
  let tuoi = today.getFullYear() - ngaysinh.getFullYear();
  let m = today.getMonth() - ngaysinh.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < ngaysinh.getDate())) {
    tuoi--;
  }

  if (tuoi < 18) {
    alert("Bạn phải đủ 18 tuổi trở lên mới được đăng ký!");
    return;
  }

  // ======= LƯU DỮ LIỆU =======
  const sv = { hoTen, email, MK, ngaysinh: ngaysinh.toISOString().split("T")[0], nganh };

  let sinhVienList = JSON.parse(localStorage.getItem("sinhVienList")) || [];
  sinhVienList.push(sv);

  localStorage.setItem("sinhVienList", JSON.stringify(sinhVienList));

  // Thông báo + chuyển trang
  alert("Đăng ký thành công!");
  window.location.href = "LIST_STU.html";
}
