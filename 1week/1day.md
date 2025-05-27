### 1일차 

### 원시타입 문제, 객체 & 배열 & 튜플 타입 문제

----

**원시 타입 관련 문제**

- 문제 1. 다음 변수들의 타입을 지정해 주세요

  - ```typescript
    let userName:string;
    let userAge:number;
    let isAdmin:boolean;
    
    userName = "ws";
    userAge = 11;
    isAdmin = true;
    ```



- 문제 2. 아래 변수들에 적절한 타입과 초기값을 지정하세요.

  - ```typescript
    let productName: string;
    let productPrice: number;
    let isAvailable: boolean;
    
    productName = "허니버터칩";
    productPrice = 3000;
    isAvailable = true;
    
    console.log(
      `상품명: ${productName}, 가격: ${productPrice}, 재고 여부: ${isAvailable}`
    );
    
    // 상품명: 허니버터칩, 가격: 3000, 재고 여부: true
    ```



-  문제 3. 두 숫자를 더하는 함수를 작성하고, 함수의 매개변수와 반환값에 타입을 지정하세요

  - ```type
    function addNumbers(a: number, b: number): number {
      return a + b;
    }
    
    console.log(addNumbers(5, 3));



- 문제4. 주어진 값을 받아 문자열로 변환하는 함수를 작성하세요. 값이 null 또는 undefined라면 "값이 없습니다"를 반환합니다

  - ```typescript
    function stringifyValue(value: string | null | undefined): string {
      if (value === null || value === undefined) {
        return "값이 없습니다";
      } else {
        return value;
      }
    }
    
    console.log(stringifyValue("Hello"))
    console.log(stringifyValue(null));
    console.log(stringifyValue(undefined));
    
    // value가 null일 경우에 typeof value === 'null'이 안됨
    // 찾아보니 js에서 null이 object 타입으로 정의되어 있다고 함
    // 그래서 js로 직접 비교
    ```



- 문제 5. 아래 함수는 두 값을 비교하여 결과를 반환합니다. 느슨한 동등성(`==`)과 엄격 동등성(`===`)의 차이를 이해하고, 함수의 동작 결과를 예측하세요.

  - ```typescript
    function compareValues(a: unknown, b: unknown): string {
      if (a === b) {
        return "엄격한 동등성";
      } else if (a == b) {
        return "느슨한 동등성";
      } else {
        return "동등하지 않음";
      }
    }
    
    console.log(compareValues(5, "5")); // 느슨한 동등성
    console.log(compareValues(null, undefined)); // 느슨한 동등성
    console.log(compareValues(false, 0)); // 느슨한 동등성
    console.log(compareValues(NaN, NaN)); // 동등하지 않음
    console.log(compareValues(42, 42)); //  엄격한 동등성
    
    console.log("123" + 123); // 123123
    
    // == 비교인 경우, 타입이 다른 값일 경우 암묵적 형변환을 한 후 비교를 진행함 => '123' + 123 할 경우 암묵적 형변환이 발생해 123123이 되는 것과 유사
    // === 비교인 경우, 값 뿐만 아니라 형이 같은지도 비교함
    // NaN은 다른 NaN과 동일하지 않음
    



문제 6. 주어진 값이 원시 타입인지 아닌지 확인하는 함수를 작성하세요.

- ```typescript
  function isPrimitive(value: unknown): boolean {
    return value === null || value !== Object(value);
  }
  
  // 함수 호출 예시
  console.log(isPrimitive("Hello")); // true
  console.log(isPrimitive(42)); // true
  console.log(isPrimitive(false)); // true
  console.log(isPrimitive(null)); // true
  console.log(isPrimitive(undefined)); // true
  console.log(isPrimitive({})); // false
  console.log(isPrimitive([])); // false
  
  /// JS는 기본형과 객체 타입(함수 타입 포함)임
  
  // 기본형 중 null은 Object 타입이므로 따로 조건 처리
  // null제외한 기본형은 Object타입이 아닌지만 확인하면 되므로 유니온 이후 조건에서 확인
  ```
  
  

----

**객체 & 배열 & 튜플 관련 문제**

문제 1.아래 객체를 보고 user의 타입을 작성하세요

- ```typescript
  let user: { name: string; age?: number; isAdmin: boolean } = {
    name: "Alice",
    isAdmin: true,
  };
  
  user = {
    name: "Bob",
    age: 40,
    isAdmin: false,
  };
  
  // age는 있는 경우도, 없는 경우도 있으므로 옵셔널 처리
  ```
  
  

문제2. 읽기 전용(readonly) 배열을 생성하고, 배열에 직접 값을 추가하거나 변경하려고 하면 오류가 발생해야 합니다.

- ```typescript
  const numbers: readonly number[] = [0, 0, 0];
  ```
  
  

문제3. 주어진 문제 1,2 번을 푸시오

- 상품 이름과 가격만을 포함하는 새로운 배열을 생성하는 함수를 작성하세요.

- 재고가 있는 상품만 포함하는 배열을 반환하는 함수를 작성하세요.

- ```typescript
  const products: [string, number, boolean][] = [
    ["Laptop", 1000, true],
    ["Shoes", 50, false],
    ["Book", 20, true],
  ];
  
  // 1. 상품 이름과 가격만 반환,리턴타입 정의필요
  function getProductNamesAndPrices(
    products: [string, number, boolean][]
  ): [string, number][] {
    return products.map((product) => [product[0], product[1]]);
  }
  
  // 2. 재고가 있는 상품만 반환,리턴타입 정의필요
  function getAvailableProducts(
    products: [string, number, boolean][]
  ): [string, number, boolean][] {
    return products.filter((product) => product[2] === true);
  }
  
  // 테스트 코드
  console.log(getProductNamesAndPrices(products));
  // 기대 출력: [["Laptop", 1000], ["Shoes", 50], ["Book", 20]]
  
  console.log(getAvailableProducts(products));
  // 기대 출력: [["Laptop", 1000, true], ["Book", 20, true]]
  ```



문제 4. 사용자 정보를 업데이트하는 함수를 작성하세요. 나이가 제공되지 않으면 기본값으로 18을 사용하세요

- ```typescript
  //매개변수, 리턴 타입 정의 필요
  // name은 무조건 온다고 가정하겠습니다.
  function updateUser(user: { name: string; age?: number }): {
    name: string;
    age: number;
  } {
    let age = user.age ?? 18;
    return { ...user, age };
  }
  
  // 테스트 코드
  console.log(updateUser({ name: "Charlie" })); // { name: "Charlie", age: 18 }
  console.log(updateUser({ name: "Dana", age: 25 })); // { name: "Dana", age: 25 }
  console.log(updateUser({ name: "ws", age: 0 })); // { name: "Dana", age: 25 }
  
  ```



문제5. 아래와 같은 데이터 구조를 사용하여 특정 카테고리에 해당하는 상품의 이름을 출력하는 함수를 작성하세요.

- ```typescript
  // proudcts 타입정의  필요
  const products: { name: string; price?: number; category?: string }[] = [
    { name: "Laptop", price: 1000, category: "Electronics" },
    { name: "Shoes", price: 50, category: "Fashion" },
    { name: "Book", price: 20 },
  ];
  
  //매개변수, 리턴 타입 정의 필요
  function getProductsByCategory(category: string) {
    return products
      .filter((product) => product.category == category)
      .map((product) => product.name);
  }
  
  // 테스트 코드
  console.log(getProductsByCategory("Electronics")); // ["Laptop"]
  console.log(getProductsByCategory("Fashion")); // ["Shoes"]
  console.log(getProductsByCategory("Books")); // []
  ```
  
- 



