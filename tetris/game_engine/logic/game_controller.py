import pygame
from settings.config import WIDTH, HEIGHT, FPS

class GameController:

    def __init__(self, input_controller, screen):
        self.input_controller = input_controller
        self.screen = screen

    def start(self):
        # self.input_controller.start()
        self.execute_frame()


    
    def execute_frame(self):
        pygame.init()
        gameDisplay = pygame.display.set_mode((WIDTH, HEIGHT))
        pygame.display.set_caption('Tetris')

        clock = pygame.time.Clock()

        is_game_stopped = False
        while not is_game_stopped:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    is_game_stopped = True

                print(event)

            pygame.display.update()
            clock.tick(FPS)



