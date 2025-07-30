/**
 * @function getCookieValue
 * @description
 * 주어진 이름(name)에 해당하는 쿠키의 값을 브라우저의 `document.cookie`에서 찾아 반환합니다.
 * 해당 이름의 쿠키가 없으면 `undefined`를 반환합니다.
 * 이 함수는 HTTP-only 쿠키는 읽을 수 없으며, JavaScript로 접근 가능한 쿠키만 처리합니다.
 *
 * @param {string} name - 가져올 쿠키의 이름입니다.
 * @returns {string | undefined} 찾은 쿠키의 값 또는 쿠키가 없으면 `undefined`를 반환합니다.
 *
 * @example
 * "accessToken=your_token_value; username=testuser" 와 같은 쿠키 문자열에서
 * getCookieValue('accessToken'); // 'your_token_value' 반환
 * getCookieValue('nonExistentCookie'); // undefined 반환
 */
const getCookieValue = (name: string): string | undefined => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return undefined;
};

export default getCookieValue;
