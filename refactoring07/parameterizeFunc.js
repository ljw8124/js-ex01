// 함수 매개변수화하기
// 두 함수의 로직이 매우 비슷하고 리터럴 값만 다르다면, 그 다른 값만 매개변수로 받아 처리하는 함수 하나로 합쳐서 중복을 없앨 수 있다.
// 이런식으로 매개변수 값만 바꿔서 여러 곳에 쓸 수 있으니 함수의 유용성이 더 커진다.

// 절차
// 1. 비슷한 함수 중 하나를 선택한다.
// 2. '함수 선언 바꾸기'로 리터럴들을 매개변수로 추가한다.
// 3. 이 함수를 호출하는 곳 모두에 적절한 리터럴 값을 추가한다.
// 4. 테스트한다.
// 5. 매개변수로 받은 값을 사용하도록 함수 본문을 수정한다. 하나 수정할 때마다 테스트한다.
// 6. 비슷한 다른 함수를 호출하는 코드를 찾아 매개변수화된 함수를 호출하도록 하나씩 수정한다.
//    하나 수정할 때마다 테스트한다.

// ex.
function tenPercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiple(1.1);
}

function fivePercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiple(1.05);
}

// 위 두 함수를 아래와 같이 수정
function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiple(1 + factor);
}

// 위와 같이 간단하게 끝내면 좋겠지만 그렇지 않은 경우도 있다.
function baseCharge(usage) {
  if(usage < 0) return usd(0);
  const amount = bottomBand(usage) * 0.03 +
      middleBand(usage) * 0.05 +
      topBand(usage) * 0.07;
  return usd(amount);
}

function bottomBand(usage) {
  return Math.min(usage, 100);
}

function middleBand(usage) {
  return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}

function topBand(usage) {
  return usage > 200 ? usage - 200 : 0;
}

// 공통으로 사용하기 위한 함수를 생성한다
function withinBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, top) - bottom : 0;
}

// 위 공통함수 생성에 따른 기존 코드 변경
function baseCharge(usage) {
  if(usage < 0) return usd(0);
  const amount =
      bottomBand(usage) * 0.03 +
      withinBand(usage, 100, 200) * 0.05 +
      topBand(usage) * 0.07;
  return usd(amount);
}

// 그 후 최종 함수 변경
function baseCharge(usage) {
  if(usage < 0) return usd(0);
  const amount =
      withinBand(usage, 0, 100) * 0.03 +
      withinBand(usage, 100, 200) * 0.05 +
      withinBand(usage, 200, Infinity) * 0.07;
  return usd(amount);
}

// 초기의 보호 구문을 제거해도 되지만, 예외 상황에서의 대처 방식을 잘 설명해주므로 그대로 두는 경우도 있다.