export = exports;
declare const exports :{
	version :'0.2.0'
	toStringLiteral (string :string) :string
	isIdentifier (id :string, notESM? :boolean) :boolean
	isBareKey (key :string, notES3? :boolean) :boolean
	default :typeof exports
};