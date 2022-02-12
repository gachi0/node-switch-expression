export default class Switch<T, R> {
    private value: T;
    private results: R[] = [];
    private _default: R;

    /**
     * @param value この値が各メソッドにマッチするか調べる一致式
     * @param _defalut 一致式がいずれのメソッドにもマッチしなかった場合に返すデフォルト値
     */
    constructor(value: T, _defalut: R) {
        this.value = value;
        this._default = _defalut;
    }

    /**
     * valueと一致式が一致した場合、結果にresultが追加されます。
     */
    case(value: T, result: R) {
        switch (this.value) {
            case value: this.results.push(result);
        }
        return this;
    }

    /**
     * valuesの中に一致式と一致するものがあった場合、結果にresultが追加されます。
     */
    cases(values: T[], result: R) {
        if (values.includes(this.value)) this.results.push(result);
        return this;
    }

    /** 
     * callbackの引数に一致式を渡して実行して、trueが返った場合、結果にresultが追加されます。
     */
    when(callback: (v: T) => boolean, result: R) {
        if (callback(this.value)) this.results.push(result);
        return this;
    }

    /**
     * flagがtrueだった場合、結果にresultが追加されます。
     */
    if(flag: boolean, result: R) {
        if (flag) this.results.push(result);
        return this;
    }

    /**
     * 最初にマッチした結果を返します。
     * いずれにもマッチしていなかった場合、デフォルト値を返します。
     * @returns 最初にマッチした結果
     */
    first() {
        return this.results[0] ?? this._default;
    }

    /**
     * 最後にマッチした結果を返します。
     * いずれにもマッチしていなかった場合、デフォルト値を返します。
     * @returns 最後にマッチした結果
     */
    last() {
        return this.results.at(-1) ?? this._default;
    }

    /**
     * すべてのマッチした結果の配列を返します。
     * いずれにもマッチしなかった場合、デフォルト値のみが入った配列を返します。
     * @returns マッチした結果の配列
     */
    all() {
        const result: R[] = [];
        result.push(...this.results);
        if (!this.results.length && this._default) {
            result.push(this._default);
        }
        return result;
    }
}
