from game_engine.logic.game_controller import GameController

class Scene:

    def __init__(self, input_controller, screen):
        self.game_controller = GameController(input_controller, screen)

    def build(self):
        pass

    def start(self):
        self.game_controller.start()