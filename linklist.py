class Node:
    def __init__(self,data=None,next=None):
        self.data = data
        self.next = next

class LinkedList:
    def __init__(self):
        self.head =None
    def insert_at_beginning(self, data):
        node = Node(data,self.head)
        self.head = node
    def insert_at_last(self,data):
        if self.head is None:
            self.head = Node(data, None)
            return
        itr = self.head
        while itr.next:
            itr = itr.next
        itr.next = Node(data,None)
    def insert_values(self,data_list):
        for data in data_list:
            self.insert_at_last(data)
    def remove_at(self,index):
        count = 0
        itr = self.head
        if index == 0:
            self.head = self.head.next
            return
        while itr:
            if count==index-1:
                itr.next = itr.next.next
            count+=1
            itr=itr.next
    def insert_at(self,index,data):
        count = 0
        if index == 0:
            self.head  = data
            return
        itr = self.head
        while itr: 
            if count==index-1:
                node = Node(data,itr.next)
                itr.next = node
            count+=1
            itr=itr.next
    def insert_after_value(self,val,insert_val):
        count = 0
        itr = self.head
        while itr:
            if itr.data == val:
                node = Node(insert_val, itr.next)
                itr.next = node
            itr = itr.next
            count+=1



    def print(self):
        if self.head is None:
            print("Linked List is empty")
            return
        itr = self.head
        lstr = ''
        while itr:
            lstr += str(itr.data) + '-->'
            itr = itr.next
        print(lstr)   
        return
    
p1 = LinkedList()
p1.insert_values([3,5,6,2,6])
#p1.insert_at(2,10)
p1.insert_after_value(2,10)
#p1.remove_at(0)
p1.print()