export default function colorIndicator(value) {
    // returns a hex value based on whether value is positive or negative
    if (value < 0) {
        return "#ff2626";
    } else if (value > 0) {
        return "#1da006";
    } else {
        return "#000000";
    }
}