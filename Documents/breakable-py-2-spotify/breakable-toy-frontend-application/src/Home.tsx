function Home(){
    const Ask = async () => {
        const response = await fetch('http://localhost:8080/me/top/artist', {
          method: 'GET'
        });
        const data=await response.text()
      };
    return (
        <h1>Hello world</h1>
    )
}