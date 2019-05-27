/*!
 * 模块名称：@ltd/j-es
 * 模块版本：0.1.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-es/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-es/
 */

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

export default ES;
export { isBareKey, isIdentifier, toStringLiteral, version };

/*¡ @ltd/j-es */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMC4xLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxudmFyIEJTID0gL1xcXFwvZztcbnZhciBMUyA9IC9cXHUyMDI4L2c7XG52YXIgUFMgPSAvXFx1MjAyOS9nO1xudmFyIENSID0gL1xcci9nO1xudmFyIExGID0gL1xcbi9nO1xudmFyIFNRID0gLycvZztcbnZhciBJZGVudGlmaWVyTmFtZSA9IC9eW2Etel8kXVtcXHckXSokL2k7XG52YXIgRGVjaW1hbEludGVnZXJMaXRlcmFsID0gL14oPzowfFsxLTldXFxkKikkLztcblxuZXhwb3J0IGZ1bmN0aW9uIHRvU3RyaW5nTGl0ZXJhbCAoc3RyaW5nIDpzdHJpbmcpIDpzdHJpbmcge1xuXHRyZXR1cm4gJ1xcJycrc3RyaW5nLnJlcGxhY2UoQlMsICdcXFxcXFxcXCcpLnJlcGxhY2UoTFMsICdcXFxcdTIwMjgnKS5yZXBsYWNlKFBTLCAnXFxcXHUyMDI5JykucmVwbGFjZShDUiwgJ1xcXFxyJykucmVwbGFjZShMRiwgJ1xcXFxuJykucmVwbGFjZShTUSwgJ1xcXFxcXCcnKSsnXFwnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSWRlbnRpZmllciAoaWQgOnN0cmluZywgbm90RVNNPyA6Ym9vbGVhbikgOmJvb2xlYW4ge1xuXHRpZiAoIElkZW50aWZpZXJOYW1lLnRlc3QoaWQpICkge1xuXHRcdGlmICggbm90UmVzZXJ2ZWRXb3JkRVMzKGlkKSApIHtcblx0XHRcdHJldHVybiBub3RFU00gPyB0cnVlIDogbm90UmVzZXJ2ZWRXb3JkRVNNKGlkKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYXJlS2V5IChrZXkgOnN0cmluZywgbm90RVMzPyA6Ym9vbGVhbikgOmJvb2xlYW4ge1xuXHRpZiAoIElkZW50aWZpZXJOYW1lLnRlc3Qoa2V5KSApIHtcblx0XHQvLyBvYmplY3QgPSB7IFsnX19wcm90b19fJ106IG51bGwgfVxuXHRcdHJldHVybiBub3RFUzMgPyB0cnVlIDogbm90UmVzZXJ2ZWRXb3JkRVMzKGtleSk7XG5cdH1cblx0aWYgKCBEZWNpbWFsSW50ZWdlckxpdGVyYWwudGVzdChrZXkpICkge1xuXHRcdC8vIG9iamVjdFtpbnRdXG5cdFx0Ly8gX1xuXHRcdHJldHVybiAra2V5KycnPT09a2V5O1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn1cblxudmFyIEVTIDphbnkgPSB7XG5cdHZlcnNpb246IHZlcnNpb24sXG5cdHRvU3RyaW5nTGl0ZXJhbDogdG9TdHJpbmdMaXRlcmFsLFxuXHRpc0lkZW50aWZpZXI6IGlzSWRlbnRpZmllcixcblx0aXNCYXJlS2V5OiBpc0JhcmVLZXlcbn07XG5FU1snZGVmYXVsdCddID0gRVM7XG5leHBvcnQgZGVmYXVsdCBFUztcblxuZnVuY3Rpb24gbm90UmVzZXJ2ZWRXb3JkRVMzIChrZXkgOnN0cmluZykgOmJvb2xlYW4ge1xuXHRzd2l0Y2ggKCBrZXkgKSB7XG5cdFx0Y2FzZSAnYnJlYWsnOlxuXHRcdGNhc2UgJ2Nhc2UnOlxuXHRcdGNhc2UgJ2NhdGNoJzpcblx0XHRjYXNlICdjbGFzcyc6Ly8gRVM2XG5cdFx0Y2FzZSAnY29uc3QnOi8vIEVTNlxuXHRcdGNhc2UgJ2NvbnRpbnVlJzpcblx0XHRjYXNlICdkZWJ1Z2dlcic6XG5cdFx0Y2FzZSAnZGVmYXVsdCc6XG5cdFx0Y2FzZSAnZGVsZXRlJzpcblx0XHRjYXNlICdkbyc6XG5cdFx0Y2FzZSAnZWxzZSc6XG5cdFx0Y2FzZSAnZW51bSc6Ly8gLi4uXG5cdFx0Y2FzZSAnZXhwb3J0JzovLyBFUzZcblx0XHRjYXNlICdleHRlbmRzJzovLyBFUzZcblx0XHRjYXNlICdmaW5hbGx5Jzpcblx0XHRjYXNlICdmb3InOlxuXHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRjYXNlICdpZic6XG5cdFx0Y2FzZSAnaW1wb3J0JzovLyBFUzZcblx0XHRjYXNlICdpbic6XG5cdFx0Y2FzZSAnaW5zdGFuY2VvZic6XG5cdFx0Y2FzZSAnbmV3Jzpcblx0XHRjYXNlICdyZXR1cm4nOlxuXHRcdGNhc2UgJ3N3aXRjaCc6XG5cdFx0Y2FzZSAnc3VwZXInOi8vIEVTNlxuXHRcdGNhc2UgJ3RoaXMnOlxuXHRcdGNhc2UgJ3Rocm93Jzpcblx0XHRjYXNlICd0cnknOlxuXHRcdGNhc2UgJ3R5cGVvZic6XG5cdFx0Y2FzZSAndmFyJzpcblx0XHRjYXNlICd2b2lkJzpcblx0XHRjYXNlICd3aGlsZSc6XG5cdFx0Y2FzZSAnd2l0aCc6XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiB0cnVlO1xuXHR9XG59XG5cbmZ1bmN0aW9uIG5vdFJlc2VydmVkV29yZEVTTSAoaWQgOnN0cmluZykgOmJvb2xlYW4ge1xuXHRzd2l0Y2ggKCBpZCApIHtcblx0XHRjYXNlICdhcmd1bWVudHMnOlxuXHRcdGNhc2UgJ2V2YWwnOlxuXHRcdGNhc2UgJ2ltcGxlbWVudHMnOi8vIC4uLlxuXHRcdGNhc2UgJ2ludGVyZmFjZSc6Ly8gLi4uXG5cdFx0Y2FzZSAnbGV0JzovLyArKytcblx0XHRjYXNlICdwYWNrYWdlJzovLyAuLi5cblx0XHRjYXNlICdwcml2YXRlJzovLyAuLi5cblx0XHRjYXNlICdwcm90ZWN0ZWQnOi8vIC4uLlxuXHRcdGNhc2UgJ3B1YmxpYyc6Ly8gLi4uXG5cdFx0Y2FzZSAnc3RhdGljJzovLyBFUzZcblx0XHRjYXNlICd5aWVsZCc6Ly8gKysrXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiB0cnVlO1xuXHR9XG59XG5cbi8vY2FzZSAnYXMnOlxuLy9jYXNlICdhc3luYyc6XG4vL2Nhc2UgJ2F3YWl0Jzpcbi8vY2FzZSAnZnJvbSc6XG4vL2Nhc2UgJ2dldCc6XG4vL2Nhc2UgJ29mJzpcbi8vY2FzZSAnc2V0Jzpcbi8vY2FzZSAndW5kZWZpbmVkJzpcblxuLy9jYXNlICdhYnN0cmFjdCc6XG4vL2Nhc2UgJ2ludCc6XG4vL2Nhc2UgJ3Nob3J0Jzpcbi8vY2FzZSAnYm9vbGVhbic6XG4vL2Nhc2UgJ2J5dGUnOlxuLy9jYXNlICdsb25nJzpcbi8vY2FzZSAnY2hhcic6XG4vL2Nhc2UgJ2ZpbmFsJzpcbi8vY2FzZSAnbmF0aXZlJzpcbi8vY2FzZSAnc3luY2hyb25pemVkJzpcbi8vY2FzZSAnZmxvYXQnOlxuLy9jYXNlICd0aHJvd3MnOlxuLy9jYXNlICdnb3RvJzpcbi8vY2FzZSAndHJhbnNpZW50Jzpcbi8vY2FzZSAndm9sYXRpbGUnOlxuLy9jYXNlICdkb3VibGUnOlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWUsT0FBTzs7c0JBQUMsdEJDR3ZCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQztBQUNmLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQztBQUNuQixJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUM7QUFDbkIsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDO0FBQ2YsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDO0FBQ2YsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ2QsSUFBSSxjQUFjLEdBQUcsa0JBQWtCLENBQUM7QUFDeEMsSUFBSSxxQkFBcUIsR0FBRyxrQkFBa0IsQ0FBQztBQUUvQyxTQUFnQixlQUFlLENBQUUsTUFBYztJQUM5QyxPQUFPLElBQUksR0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUMsSUFBSSxDQUFDO0NBQ3BKO0FBRUQsU0FBZ0Is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