from tkinter import *


class UserInterface:

    size_of_box = 150


    def __init__(self,tictactoe):
        self.main=tictactoe
        pass


    def show_on_canvas(self):

        for i in range(0, 3):
            for j in range(0, 3):
                if(self.main.arr[i][j]==0):
                    self.canvas.create_text(i*self.size_of_box+10, j*self.size_of_box-10, fill="darkblue", font="Ariel 120 bold", text="O", anchor=NW, tag="ox")
                elif(self.main.arr[i][j]==1):
                    self.canvas.create_text(i*self.size_of_box+10, j*self.size_of_box-10, fill="red", font="Ariel 120 bold", text="X", anchor=NW, tag="ox")


    def print_winner(self,winner):

        if(winner==0):
            self.message_area.create_text(50, 0, fill="darkblue", font="Ariel 20 bold", text="Winner O", anchor=NW, tag="winner")
        else:
            self.message_area.create_text(50, 0, fill="red", font="Ariel 20 bold",text="Winner X", anchor=NW, tag="winner")


    def click_on_canvas(self,event):

        if(self.main.turn==-1):
            return

        x_coord=event.x;
        y_coord=event.y;

        x_coord=int(x_coord/self.size_of_box)
        y_coord=int(y_coord/self.size_of_box)

        #print("x="+str(x_coord)+" y="+str(y_coord))

        if(self.main.arr[x_coord][y_coord]==-1):
            self.main.arr[x_coord][y_coord]=self.main.turn
            self.show_on_canvas()

            winner=self.main.check_winner()
            if(winner!=-1 ):
                self.print_winner(winner)
                self.main.turn=-1
            else:
                self.main.turn = (self.main.turn + 1) % 2


    def reset(self):

        for i in range(0, 3):
            for j in range(0, 3):
                self.main.arr[i][j]=-1

        self.main.turn=0

        #self.message_area.create_text(50, 0, fill="red", font="Ariel 20 bold",text="Reset", anchor=NW)

        self.canvas.delete("ox")
        self.message_area.delete("winner")
        self.show_on_canvas()


    def print_array(self):
        for i in range(0, 3):
            for j in range(0, 3):
                print(self.main.arr[i][j])


    def create_play_area_canvas(self):

        size = self.size_of_box

        self.canvas = Canvas(self.play_area, width=3 * size, height=3 * size)
        self.canvas.create_line(size, 0, size, 3 * size)
        self.canvas.create_line(2 * size, 0, 2 * size, 3 * size)
        self.canvas.create_line(0, size, 3 * size, size)
        self.canvas.create_line(0, 2 * size, 3 * size, 2 * size)

        self.canvas.bind("<Button-1>", self.click_on_canvas)
        self.canvas.pack()


    def create_base(self, base_frame):

        self.play_area = Frame(base_frame, width=3 * self.size_of_box, height=3 * self.size_of_box, background="#c8cecb")
        self.play_area.pack(anchor=NW)


        self.create_play_area_canvas()

        self.reset_button=Button(base_frame,text="RESET", command=self.reset)
        self.reset_button.pack()

        #self.button = Button(base_frame, text="Array", command=self.print_array)
        #self.button.pack()

        self.message_area=Canvas(base_frame, width=450, height=50,background="white")
        self.message_area.pack(side=BOTTOM)


        self.canvas.pack()


    def design_base(self):
        root = Tk()

        # root.geometry("width x height + left margin + top margin")
        root.geometry("450x600+300+100")
        root.title("TicTacToe")

        base_frame = Frame(root, background="#9ab1d1")
        base_frame.pack(fill="both", expand="True")

        self.create_base(base_frame)

        root.mainloop()


if __name__=='__main__':
    pass

