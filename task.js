
function fn() {
    console.log('FN', this)
}

const fn2 = () => {
    console.log('FN 2', this)
}

const someObject = {
    id: 'id',
    name: 'name',
    fn,
    fn2
}

someObject.fn()
someObject.fn2()
