let url = ''
if (process.env.NODE_ENV === 'development') {
    url = 'http://localhost:5000/'
}
else {
    url = ''
}

export default url