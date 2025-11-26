function tambahSatuHari(date: Date) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
}

export const getHariIni = () => {
  const tanggal_hari_ini = new Date();
  const tanggal_gt = String(tanggal_hari_ini.getDate()).padStart(2, "0");
  const bulan_gt = String(tanggal_hari_ini.getMonth() + 1).padStart(2, "0");
  const tahun_gt = tanggal_hari_ini.getFullYear();

  const tanggal_besok = tambahSatuHari(tanggal_hari_ini);
  const tanggal_lt = String(tanggal_besok.getDate()).padStart(2, "0");
  const bulan_lt = String(tanggal_besok.getMonth() + 1).padStart(2, "0");
  const tahun_lt = tanggal_besok.getFullYear();

  return {
    gt: new Date(`${tahun_gt}-${bulan_gt}-${tanggal_gt}T00:00:00.000Z`),
    lt: new Date(`${tahun_lt}-${bulan_lt}-${tanggal_lt}T00:00:00.000Z`),
  };
};
