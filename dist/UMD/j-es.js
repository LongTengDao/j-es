/*!
 * 模块名称：@ltd/j-es
 * 模块版本：0.1.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-es/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-es/
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.ES = factory());
}(this, function () { 'use strict';

    var version = '0.1.0';

    var BS = /\\/g;
    var LS = /\u2028/g;
    var PS = /\u2029/g;
    var CR = /\r/g;
    var LF = /\n/g;
    var SQ = /'/g;
    var IdentifierName = /^[a-z_$][\w$]*$/i;
    var DecimalIntegerLiteral = /^(?:0|[1-9]\d*)$/;
    function toStringLiteral(string) {
        return '\'' + string.replace(BS, '\\\\').replace(LS, '\\u2028').replace(PS, '\\u2029').replace(CR, '\\r').replace(LF, '\\n').replace(SQ, '\\\'') + '\'';
    }
    function isIdentifier(id, notESM) {
        if (IdentifierName.test(id)) {
            if (notReservedWordES3(id)) {
                return notESM ? true : notReservedWordESM(id);
            }
        }
        return false;
    }
    function isBareKey(key, notES3) {
        if (IdentifierName.test(key)) {
            // object = { ['__proto__']: null }
            return notES3 ? true : notReservedWordES3(key);
        }
        if (DecimalIntegerLiteral.test(key)) {
            // object[int]
            // _
            return +key + '' === key;
        }
        return false;
    }
    var ES = {
        version: version,
        toStringLiteral: toStringLiteral,
        isIdentifier: isIdentifier,
        isBareKey: isBareKey
    };
    ES['default'] = ES;
    function notReservedWordES3(key) {
        switch (key) {
            case 'break':
            case 'case':
            case 'catch':
            case 'class': // ES6
            case 'const': // ES6
            case 'continue':
            case 'debugger':
            case 'default':
            case 'delete':
            case 'do':
            case 'else':
            case 'enum': // ...
            case 'export': // ES6
            case 'extends': // ES6
            case 'finally':
            case 'for':
            case 'function':
            case 'if':
            case 'import': // ES6
            case 'in':
            case 'instanceof':
            case 'new':
            case 'return':
            case 'switch':
            case 'super': // ES6
            case 'this':
            case 'throw':
            case 'try':
            case 'typeof':
            case 'var':
            case 'void':
            case 'while':
            case 'with':
                return false;
            default:
                return true;
        }
    }
    function notReservedWordESM(id) {
        switch (id) {
            case 'arguments':
            case 'eval':
            case 'implements': // ...
            case 'interface': // ...
            case 'let': // +++
            case 'package': // ...
            case 'private': // ...
            case 'protected': // ...
            case 'public': // ...
            case 'static': // ES6
            case 'yield': // +++
                return false;
            default:
                return true;
        }
    }
    //case 'as':
    //case 'async':
    //case 'await':
    //case 'from':
    //case 'get':
    //case 'of':
    //case 'set':
    //case 'undefined':
    //case 'abstract':
    //case 'int':
    //case 'short':
    //case 'boolean':
    //case 'byte':
    //case 'long':
    //case 'char':
    //case 'final':
    //case 'native':
    //case 'synchronized':
    //case 'float':
    //case 'throws':
    //case 'goto':
    //case 'transient':
    //case 'volatile':
    //case 'double':

    return ES;

}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMC4xLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxudmFyIEJTID0gL1xcXFwvZztcbnZhciBMUyA9IC9cXHUyMDI4L2c7XG52YXIgUFMgPSAvXFx1MjAyOS9nO1xudmFyIENSID0gL1xcci9nO1xudmFyIExGID0gL1xcbi9nO1xudmFyIFNRID0gLycvZztcbnZhciBJZGVudGlmaWVyTmFtZSA9IC9eW2Etel8kXVtcXHckXSokL2k7XG52YXIgRGVjaW1hbEludGVnZXJMaXRlcmFsID0gL14oPzowfFsxLTldXFxkKikkLztcblxuZXhwb3J0IGZ1bmN0aW9uIHRvU3RyaW5nTGl0ZXJhbCAoc3RyaW5nIDpzdHJpbmcpIDpzdHJpbmcge1xuXHRyZXR1cm4gJ1xcJycrc3RyaW5nLnJlcGxhY2UoQlMsICdcXFxcXFxcXCcpLnJlcGxhY2UoTFMsICdcXFxcdTIwMjgnKS5yZXBsYWNlKFBTLCAnXFxcXHUyMDI5JykucmVwbGFjZShDUiwgJ1xcXFxyJykucmVwbGFjZShMRiwgJ1xcXFxuJykucmVwbGFjZShTUSwgJ1xcXFxcXCcnKSsnXFwnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSWRlbnRpZmllciAoaWQgOnN0cmluZywgbm90RVNNPyA6Ym9vbGVhbikgOmJvb2xlYW4ge1xuXHRpZiAoIElkZW50aWZpZXJOYW1lLnRlc3QoaWQpICkge1xuXHRcdGlmICggbm90UmVzZXJ2ZWRXb3JkRVMzKGlkKSApIHtcblx0XHRcdHJldHVybiBub3RFU00gPyB0cnVlIDogbm90UmVzZXJ2ZWRXb3JkRVNNKGlkKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYXJlS2V5IChrZXkgOnN0cmluZywgbm90RVMzPyA6Ym9vbGVhbikgOmJvb2xlYW4ge1xuXHRpZiAoIElkZW50aWZpZXJOYW1lLnRlc3Qoa2V5KSApIHtcblx0XHQvLyBvYmplY3QgPSB7IFsnX19wcm90b19fJ106IG51bGwgfVxuXHRcdHJldHVybiBub3RFUzMgPyB0cnVlIDogbm90UmVzZXJ2ZWRXb3JkRVMzKGtleSk7XG5cdH1cblx0aWYgKCBEZWNpbWFsSW50ZWdlckxpdGVyYWwudGVzdChrZXkpICkge1xuXHRcdC8vIG9iamVjdFtpbnRdXG5cdFx0Ly8gX1xuXHRcdHJldHVybiAra2V5KycnPT09a2V5O1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn1cblxudmFyIEVTIDphbnkgPSB7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdHRvU3RyaW5nTGl0ZXJhbDogdG9TdHJpbmdMaXRlcmFsLFxuXHRpc0lkZW50aWZpZXI6IGlzSWRlbnRpZmllcixcblx0aXNCYXJlS2V5OiBpc0JhcmVLZXlcbn07XG5FU1snZGVmYXVsdCddID0gRVM7XG5leHBvcnQgZGVmYXVsdCBFUztcblxuZnVuY3Rpb24gbm90UmVzZXJ2ZWRXb3JkRVMzIChrZXkgOnN0cmluZykgOmJvb2xlYW4ge1xuXHRzd2l0Y2ggKCBrZXkgKSB7XG5cdFx0Y2FzZSAnYnJlYWsnOlxuXHRcdGNhc2UgJ2Nhc2UnOlxuXHRcdGNhc2UgJ2NhdGNoJzpcblx0XHRjYXNlICdjbGFzcyc6Ly8gRVM2XG5cdFx0Y2FzZSAnY29uc3QnOi8vIEVTNlxuXHRcdGNhc2UgJ2NvbnRpbnVlJzpcblx0XHRjYXNlICdkZWJ1Z2dlcic6XG5cdFx0Y2FzZSAnZGVmYXVsdCc6XG5cdFx0Y2FzZSAnZGVsZXRlJzpcblx0XHRjYXNlICdkbyc6XG5cdFx0Y2FzZSAnZWxzZSc6XG5cdFx0Y2FzZSAnZW51bSc6Ly8gLi4uXG5cdFx0Y2FzZSAnZXhwb3J0JzovLyBFUzZcblx0XHRjYXNlICdleHRlbmRzJzovLyBFUzZcblx0XHRjYXNlICdmaW5hbGx5Jzpcblx0XHRjYXNlICdmb3InOlxuXHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRjYXNlICdpZic6XG5cdFx0Y2FzZSAnaW1wb3J0JzovLyBFUzZcblx0XHRjYXNlICdpbic6XG5cdFx0Y2FzZSAnaW5zdGFuY2VvZic6XG5cdFx0Y2FzZSAnbmV3Jzpcblx0XHRjYXNlICdyZXR1cm4nOlxuXHRcdGNhc2UgJ3N3aXRjaCc6XG5cdFx0Y2FzZSAnc3VwZXInOi8vIEVTNlxuXHRcdGNhc2UgJ3RoaXMnOlxuXHRcdGNhc2UgJ3Rocm93Jzpcblx0XHRjYXNlICd0cnknOlxuXHRcdGNhc2UgJ3R5cGVvZic6XG5cdFx0Y2FzZSAndmFyJzpcblx0XHRjYXNlICd2b2lkJzpcblx0XHRjYXNlICd3aGlsZSc6XG5cdFx0Y2FzZSAnd2l0aCc6XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiB0cnVlO1xuXHR9XG59XG5cbmZ1bmN0aW9uIG5vdFJlc2VydmVkV29yZEVTTSAoaWQgOnN0cmluZykgOmJvb2xlYW4ge1xuXHRzd2l0Y2ggKCBpZCApIHtcblx0XHRjYXNlICdhcmd1bWVudHMnOlxuXHRcdGNhc2UgJ2V2YWwnOlxuXHRcdGNhc2UgJ2ltcGxlbWVudHMnOi8vIC4uLlxuXHRcdGNhc2UgJ2ludGVyZmFjZSc6Ly8gLi4uXG5cdFx0Y2FzZSAnbGV0JzovLyArKytcblx0XHRjYXNlICdwYWNrYWdlJzovLyAuLi5cblx0XHRjYXNlICdwcml2YXRlJzovLyAuLi5cblx0XHRjYXNlICdwcm90ZWN0ZWQnOi8vIC4uLlxuXHRcdGNhc2UgJ3B1YmxpYyc6Ly8gLi4uXG5cdFx0Y2FzZSAnc3RhdGljJzovLyBFUzZcblx0XHRjYXNlICd5aWVsZCc6Ly8gKysrXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiB0cnVlO1xuXHR9XG59XG5cbi8vY2FzZSAnYXMnOlxuLy9jYXNlICdhc3luYyc6XG4vL2Nhc2UgJ2F3YWl0Jzpcbi8vY2FzZSAnZnJvbSc6XG4vL2Nhc2UgJ2dldCc6XG4vL2Nhc2UgJ29mJzpcbi8vY2FzZSAnc2V0Jzpcbi8vY2FzZSAndW5kZWZpbmVkJzpcblxuLy9jYXNlICdhYnN0cmFjdCc6XG4vL2Nhc2UgJ2ludCc6XG4vL2Nhc2UgJ3Nob3J0Jzpcbi8vY2FzZSAnYm9vbGVhbic6XG4vL2Nhc2UgJ2J5dGUnOlxuLy9jYXNlICdsb25nJzpcbi8vY2FzZSAnY2hhcic6XG4vL2Nhc2UgJ2ZpbmFsJzpcbi8vY2FzZSAnbmF0aXZlJzpcbi8vY2FzZSAnc3luY2hyb25pemVkJzpcbi8vY2FzZSAnZmxvYXQnOlxuLy9jYXNlICd0aHJvd3MnOlxuLy9jYXNlICdnb3RvJzpcbi8vY2FzZSAndHJhbnNpZW50Jzpcbi8vY2FzZSAndm9sYXRpbGUnOlxuLy9jYXNlICdkb3VibGUnOlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtCQUFlLE9BQU87OzBCQUFDLHRCQ0d2QixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFDZixJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUM7SUFDbkIsSUFBSSxFQUFFLEdBQUcsU0FBUyxDQUFDO0lBQ25CLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNmLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNmLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztJQUNkLElBQUksY0FBYyxHQUFHLGtCQUFrQixDQUFDO0lBQ3hDLElBQUkscUJBQXFCLEdBQUcsa0JBQWtCLENBQUM7QUFFL0MsYUFBZ0IsZUFBZSxDQUFFLE1BQWM7UUFDOUMsT0FBTyxJQUFJLEdBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFDLElBQUksQ0FBQztJQUNySixDQUFD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