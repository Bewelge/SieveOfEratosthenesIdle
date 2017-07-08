var ArrayA = [5,4,6,8,2,3,1,9,7];
function quickSort(arr) {
	if (arr.length == 1) {
		return arr;
	}
	if ( arr.length  > 0 ) {

		var H = [];
		var L = [];
		var pivot = arr[arr.length-1];
		for (var i = 0; i< arr.length;i++) {
			if (arr[i]>pivot) {
				H.push(arr[i]);
			} else if (arr[i] != pivot) {
				L.push(arr[i]);
			}
		}
		if (H.length>0) {
			if (H.length==1) {
				// H = H;
			} else {
				console.log(H);
				H = quickSort(H.slice(0));
			}
		}
		if (L.length>0) {
			if (L.length==1) {
				// H = H;
			} else {
				console.log(L);
				L = quickSort(L.slice(0));
			}
		}
		L.push(pivot);
		for (var j = 0;j<H.length;j++) {
			L.push(H[j]);
		}
		return L;

	}
}
function swap(arr, a, b) {
	var temp = arr[b];
	arr[b] = arr[a];
	arr[a] = temp;
	temp = null;
	return arr;
}