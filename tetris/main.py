from game_engine.output.world.scene import Scene
from game_engine.input.input_controller import InputController
from game_engine.output.screen import Screen

if __name__ == '__main__':
    scene = Scene(InputController(),Screen())
    scene.build()
    scene.start()