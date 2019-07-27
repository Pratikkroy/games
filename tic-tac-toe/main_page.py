import user_interface

class TicTacToe:

    arr=[]
    turn=0


    def initialize_array(self):

        arr1 = [-1, -1, -1]
        arr2 = [-1, -1, -1]
        arr3 = [-1, -1, -1]

        self.arr.append(arr1)
        self.arr.append(arr2)
        self.arr.append(arr3)


    def check_winner(self):

        for player in range(0,2):
            if (self.arr[0][0] == player and self.arr[0][1] == player and self.arr[0][2] == player): return player
            if (self.arr[1][0] == player and self.arr[1][1] == player and self.arr[1][2] == player): return player
            if (self.arr[2][0] == player and self.arr[2][1] == player and self.arr[2][2] == player): return player

            if (self.arr[0][0] == player and self.arr[1][0] == player and self.arr[2][0] == player): return player
            if (self.arr[0][1] == player and self.arr[1][1] == player and self.arr[2][1] == player): return player
            if (self.arr[0][2] == player and self.arr[1][2] == player and self.arr[2][2] == player): return player

            if (self.arr[0][0] == player and self.arr[1][1] == player and self.arr[2][2] == player): return player
            if (self.arr[0][2] == player and self.arr[1][1] == player and self.arr[2][0] == player): return player

        return -1


if __name__=="__main__":

    new_game=TicTacToe()
    new_game.initialize_array()

    ui=user_interface.UserInterface(new_game)

    ui.design_base()
