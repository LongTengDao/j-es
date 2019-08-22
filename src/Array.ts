import Primitive from './Primitive';

export function ArrayLiteral (
	array :Readonly<any[]>,
	options :{
		ES? :number,
		open_close? :string,// s | nT  | nT
		open_first? :string,// s | nTt | nTt
		item_comma? :string,
		comma_next? :string,// s | nTt | nTt
		last_close? :string,// s | s   | $nT
	}
) :string {
	var items :string[];
	var length = array.length;
	if ( length===1 ) {
		var item = Primitive(array[0], 0, array, options as {});
		if ( item || options.ES!>=5 ) { items = [ item ]; }
		else {
			return '/*#__PURE__*/function(){var a=['+( options.open_first || '' )+( options.last_close || '' )+'];a.length=1;return a}()';
		}
	}
	else {
		items = [];
		for ( var index = 0; index<length; ++index ) {
			items.push(Primitive(array[index], index, array, options as {}));
		}
	}
	return '['+(
		items.length
			? ( options.open_first || '' )+items.join(( options.item_comma || '' )+','+( options.comma_next || '' ))+( options.last_close || '' )
			: options.open_close || ''
	)+']';
}
