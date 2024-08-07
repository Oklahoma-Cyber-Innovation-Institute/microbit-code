radio.onReceivedString(function (receivedString) {
    stepMotor(receivedString, 100)
})
function stepMotor (direction: string, duration: number) {
    if (direction == "forward") {
        neZha.setMotorSpeed(neZha.MotorList.M1, -100)
        neZha.setMotorSpeed(neZha.MotorList.M4, 100)
    }
    if (direction == "stop") {
        neZha.stopAllMotor()
    }
    if (direction == "left") {
        neZha.setMotorSpeed(neZha.MotorList.M1, 0)
        neZha.setMotorSpeed(neZha.MotorList.M4, 100)
    }
    if (direction == "right") {
        neZha.setMotorSpeed(neZha.MotorList.M1, -100)
        neZha.setMotorSpeed(neZha.MotorList.M4, 0)
    }
    basic.pause(duration)
    neZha.stopAllMotor()
}
radio.setGroup(1)
let lean_angle = 375
// Subtract to lean forward
// Add to lean backward
neZha.setServoAngel(neZha.ServoTypeList._360, neZha.ServoList.S1, lean_angle)
PlanetX_AILens.initModule()
PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Face)
basic.forever(function () {
    PlanetX_AILens.cameraImage()
    if (PlanetX_AILens.checkFace()) {
        if (PlanetX_AILens.faceData(PlanetX_AILens.Facestatus.Y) < 90) {
            lean_angle += -2
        } else {
            if (PlanetX_AILens.faceData(PlanetX_AILens.Facestatus.Y) > 150) {
                lean_angle += 2
            }
        }
        neZha.setServoAngel(neZha.ServoTypeList._360, neZha.ServoList.S1, lean_angle)
        if (PlanetX_AILens.faceData(PlanetX_AILens.Facestatus.X) < 90) {
            stepMotor("right", 10)
        }
        if (PlanetX_AILens.faceData(PlanetX_AILens.Facestatus.X) > 150) {
            stepMotor("left", 10)
        }
    }
})
