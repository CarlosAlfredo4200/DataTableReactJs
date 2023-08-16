
const GeneradorId = () => {
    const random = Math.random().toString(36).substring(2, 12);
    return random;
}

export default GeneradorId