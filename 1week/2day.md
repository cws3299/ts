**type, interface 과제** , **고급 타입 문제**

----

**문제 1. 사용자 정보를 나타내는 인터페이스와 타입을 작성하세요. 사용자 정보는 다음과 같은 구조를 가집니다**



```typescript
interface IUser {
  id: number;
  name: string;
  email?: string;
}

type TUser = {
  id: number;
  name: string;
  email?: string;
};

const user: IUser = {
  id: 1,
  name: "Alice",
};

const userWithEmail: TUser = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
};
```



**문제 2. 아래와 같은 구조를 나타내는 타입을 정의하고, 해당 타입을 기반으로 객체를 작성하세요.**



```typescript
// User 타입을 작성하세요.
// 여기에 작성

interface IUser {
  id: number;
  name: string;
  address: {
    city: string;
    zipCode: number;
  };
}

type TUser = {
  id: number;
  name: string;
  address: {
    city: string;
    zipCode: number;
  };
};

// User 타입을 사용하여 아래 객체를 작성하세요.
const user: IUser = {
  id: 1,
  name: "Alice",
  address: {
    city: "Seoul",
    zipCode: 12345,
  },
};

```



**문제 3. 아래 조건에 따라 인터페이스를 확장하세요.**

```typescript
// User 인터페이스 작성
// 여기에 작성
interface User {
  id: number;
  name: string;
  email?: string;
}

// Admin 인터페이스 작성 (User 확장)
// 여기에 작성
interface Admin extends User {
  role: string;
}

const normalUser: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

const adminUser: Admin = {
  id: 2,
  name: "Bob",
  role: "Administrator",
};

```



**문제 4. 아래 조건에 따라 type을 확장하세요.**

```typescript
// Product 타입 작성
// 여기에 작성
type Product = {
  id: number;
  name: string;
  price: number;
};

// DiscountedProduct 타입 작성 (Product 확장)
// 여기에 작성
type DiscountedProduct = Product & { discount: number };

const normalProduct: Product = {
  id: 1,
  name: "Laptop",
  price: 1000,
};

const discountedProduct: DiscountedProduct = {
  id: 2,
  name: "Smartphone",
  price: 800,
  discount: 10,
};

```



**문제 5.아래 조건을 만족하는 인터페이스를 작성하고, 해당 타입을 기반으로 객체를 작성하세요.**



```typescript
// Product 타입 작성
// 여기에 작성
interface Product {
  id: number;
  name: string;
  price: number;
}

// Order 타입 작성
// 여기에 작성
interface Order {
  orderId: number;
  products: Product[];
  totalPrice: number;
}

// Order 타입을 사용하여 아래 객체를 작성하세요.
const order: Order = {
  orderId: 101,
  products: [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Mouse", price: 50 },
  ],
  totalPrice: 1050,
};

```



**문제 6. 아래 조건을 만족하는 타입과 인터페이스를 작성하고, 해당 타입을 기반으로 객체를 작성하세요.**

```typescript
// BaseUser 인터페이스 작성
// 여기에 작성
interface BaseUser {
  id: number;
  name: string;
}

// AdminUser 타입 작성
// 여기에 작성
type AdminUser = BaseUser & { role: string };

// GuestUser 타입 작성
// 여기에 작성
type GuestUser = BaseUser & { visitCount: number };

// 아래 객체를 작성하세요.
const admin: AdminUser = {
  id: 1,
  name: "Alice",
  role: "Administrator",
};

const guest: GuestUser = {
  id: 2,
  name: "Bob",
  visitCount: 5,
};

```





---

**고급 타입 문제**

---

**문제 1.  작업의 상태를 나타내는 enum을 작성하고, 상태에 따라 다른 메시지를 반환하는 함수를 작성하세요.**

```typescript
// 작업 상태를 나타내는 enum을 작성하세요.
// 여기에 작성
enum TaskStatus {
  Pending = "Pending",
  InProgress = "InProgress",
  Completed = "Completed",
}

function getStatusMessage(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.Pending:
      return "작업이 대기 중입니다.";
    case TaskStatus.InProgress:
      return "작업이 진행 중입니다.";
    case TaskStatus.Completed:
      return "작업이 완료되었습니다.";
    default:
      return "";
  }
}

// 테스트 코드
console.log(getStatusMessage(TaskStatus.Pending)); // "작업이 대기 중입니다."
console.log(getStatusMessage(TaskStatus.InProgress)); // "작업이 진행 중입니다."
console.log(getStatusMessage(TaskStatus.Completed)); // "작업이 완료되었습니다."

```



**문제 2. 아래 조건에 따라 함수를 작성하세요.**



```typescript
// 작업 상태를 나타내는 enum 작성
// 여기에 작성
enum TaskStatus {
  Pending = "Pending ",
  InProgress = "InProgress",
  Completed = "Completed",
  Failed = "Failed",
}

function processTask(status: TaskStatus, input: unknown): string {
  if (typeof input !== "string") {
    throw new Error("입력값은 문자열이어야 합니다.");
  }

  switch (status) {
    case TaskStatus.Pending:
      return input.toUpperCase();
    case TaskStatus.InProgress:
      return input.toLowerCase();
    case TaskStatus.Completed:
      return `완료: ${input}`;
    case TaskStatus.Failed:
      throw new Error("작업이 실패했습니다.");
    default:
      return "";
  }
}

// 테스트 코드

console.log(processTask(TaskStatus.Pending, "task1"));
// 기대 출력: "TASK1"

console.log(processTask(TaskStatus.InProgress, "TaskA"));
// 기대 출력: "taska"

console.log(processTask(TaskStatus.Completed, "Report1"));
// 기대 출력: "완료: Report1"

try {
  console.log(processTask(TaskStatus.Failed, "TaskX"));
  // 에러: 작업이 실패했습니다.
} catch (error) {
  console.log(error);
}

try {
  console.log(processTask(TaskStatus.Pending, 42));
  // 에러: 입력값은 문자열이어야 합니다.
} catch (error) {
  console.log(error);
}

```



**문제 3. 아래 조건에 따라 코드를 작성하세요.**

```typescript
enum LogLevel {
  Info = "Info",
  Error = "Error",
  Debug = "Debug",
}

type LogMessage = (message: string, level: LogLevel) => void;

const logMessage: LogMessage = (message, level) => {
  switch (level) {
    case LogLevel.Info:
      console.log(`[ERROR] ${message}`);
      break;
    case LogLevel.Error:
      console.log(`[ERROR] ${message}`);
      break;
    case LogLevel.Debug:
      console.log(`[DEBUG] ${message}`);
      break;
    default:
      return "";
  }
};

logMessage("시스템이 시작되었습니다.", LogLevel.Info);
logMessage("네트워크 연결 실패!", LogLevel.Error);
logMessage("디버깅 모드 활성화", LogLevel.Debug);

```



**문제 4. 아래 조건을 만족하는 함수를 작성하세요.**



```typescript
function processAny(input: any): string {
  return input.toString();
}

function processUnknown(input: unknown): string | number {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else if (typeof input === "number") {
    return input * 10;
  } else {
    throw new Error("지원되지 않는 타입입니다.");
  }
}

// 테스트 코드
console.log(processAny("hello")); // 기대 출력: "hello"
console.log(processAny(42)); // 기대 출력: "42"
console.log(processAny(true)); // 기대 출력: "true"

console.log(processUnknown("hello")); // 기대 출력: "HELLO"
console.log(processUnknown(42)); // 기대 출력: 420
console.log(processUnknown(true)); // 에러 발생

try {
  console.log(processAny("hello")); // 기대 출력: "hello"
  console.log(processAny(42)); // 기대 출력: "42"
  console.log(processAny(true)); // 기대 출력: "true"

  console.log(processUnknown("hello")); // 기대 출력: "HELLO"
  console.log(processUnknown(42)); // 기대 출력: 420
  console.log(processUnknown(true)); // 에러 발생
} catch (error) {
  console.log(error.message);
}
```

