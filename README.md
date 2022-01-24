# Usage / 使い方

## Basic usage
```js
// モジュールの読み込み(以下省略します)
const Switch = require("Switch");

const gamemode = "easy";
// コンストラクタの第1引数には、Switchの一致式 (`switch (value){ ...` のvalueにあたる部分) を指定します。
// 第2引数には、いずれにもマッチしなかった場合に返す値を指定します。(switch文の`defalut:`節にあたります)
const description = new Switch(gamemode, "difficulty not found")
    // casesの第1引数に配列を渡すことで、配列の中のいずれかに一致した場合の値を指定できます。
    .cases(["peaceful", "easy"], "for beginners")
    .case("normal", "for intermediate")
    .case("hard", "for advanced")
    // last(), first(), all() のいずれかで、Switchの結果を取得できます。(それぞれの違いについては以下を参照)
    .last();
console.log(description); // "for beginners"
```

## Usage `when`
```js
const num = -2;
const numInfo = new Switch(num, "not found")
    .case(0, "zero")
    .case(1, "one")
    // `when`の第1引数に渡された関数に一致式を渡して、trueが返ってきた場合、結果に第2引数が追加されます。
    .when(n => n < 0, "negative number")
    .when(n => n % 2 === 0, "even")
    .when(isNaN, "NaN")
    .last();
console.log(numInfo); // "even"
```

## Usage `if`
```js
const num = 2;
const numInfo = new Switch(num, "else")
    // `if`の第1引数がtrueだった場合、結果に第2引数が追加されます。
    .if(num % 2 === 0, "even")
    .if(num < 0, "negative number")
    .first();
console.log(numInfo); // "even"
```

## Switchの結果を取得する
`first()` は、最初にマッチした結果を返します。  
`last()` は、最後にマッチした結果を返します。  
いずれも、マッチしていなかった場合は、デフォルト値を返します。  
`all()` は、マッチした結果をすべて配列で返します。  
マッチしていなかった場合は、デフォルト値のみが入った要素数1の配列を返します。  
```js
const num = -2;
const numInfo = new Switch(num, "not found")
    .case(0, "zero")
    .case(1, "one")
    .when(n => n < 0, "negative number")
    .when(n => n % 2 === 0, "even")
    .when(isNaN, "NaN");
console.log(numInfo.first()); // "negative number"
console.log(numInfo.last()); // "even"
console.log(numInfo.all()); // ["negative number", "even"]
```

## 明示的に型を指定する場合(TypeScript)
```ts
import Switch from "Switch";

const statusCode = 404;
const message = new Switch<number, string | null>(statusCode, null)
    .when(n => 100 <= n && n < 200, "Info")
    .when(n => 200 <= n && n < 300, "Success")
    .when(n => 300 <= n && n < 400, "Redirect")
    .when(n => 400 <= n && n < 500, "Client Error")
    .when(n => 500 <= n && n < 600, "Server Error")
    .last();
console.log(message); // Client Error
```

### こういう書き方も可。(より短い)
```ts
const statusCode = 404;
const message = new Switch(statusCode, null as string | null)
    .when(n => 100 <= n && n < 200, "Info")
    .when(n => 200 <= n && n < 300, "Success")
    .when(n => 300 <= n && n < 400, "Redirect")
    .when(n => 400 <= n && n < 500, "Client Error")
    .when(n => 500 <= n && n < 600, "Server Error")
    .last();
console.log(message); // Client Error
```