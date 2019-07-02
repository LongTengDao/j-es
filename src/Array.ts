export function ArrayLiteral<Item extends any> (
	array :Item[],
	ItemLiteral :(item :Item) => string,
	options? :{
		open_close? :string,// s | nT  | nT
		open_first? :string,// s | nTt | nTt
		comma_next? :string,// s | nTt | nTt
		last_close? :string,// s | s   | $nT
	}
) :string {
	if ( options ) {
		var open_close = options.open_close;
		var open_first = options.open_first;
		var comma_next = options.comma_next;
		var last_close = options.last_close;
	}
	var items :string[] = [];
	for ( var length = array.length, index = 0; index<length; ) {
		items.push(ItemLiteral(array[index]));
	}
	return '['+( items.length
			? ( open_first || '' )+items.join(','+( comma_next || '' ))+( last_close || '' )
			: open_close || ''
	)+']';
}