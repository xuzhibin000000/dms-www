## API DOC

code - template
```
	<button @click="show = true"></button>
	<app-dialog :show.sync='show' size='tiny/small/large/full'>
      // TODO ...
    </app-dialog>
```

code - js
```
	export default {
		data() {
			return {
				show: false
			}
		}
	}
```