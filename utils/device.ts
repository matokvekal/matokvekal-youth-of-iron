export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function openURL(url: string) {
  if (isMobile()) {
    window.open(url, '_self');
  } else {
    window.open(url, '_blank');
  }
}
