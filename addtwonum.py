# Definition for singly-linked list.
class ListNode(object):
     def __init__(self, data=None, next=None):
        self.data = data
        self.next = next
class Solution(object):
    def __init__(self):
        self.head = None
    def insert_at_last(self,data):
        if self.head is None:
            self.head = ListNode(data, None)
            return
        itr = self.head
        while itr.next:
            itr = itr.next
        itr.next = ListNode(data,None)
    
    def insert_values(self,data_list):
        for data in data_list:
            self.insert_at_last(data)

    def print(self,list):
        itr = self.head
        lstr = ''
        while itr:
            lstr += str(itr.data)+'-->'
            itr = itr.next
        print(lstr)
        return
    #def addTwoNumbers(self, l1, l2):
        
p1 = Solution()
l1 = p1.insert_values([2,3,4])
l2 = p1.insert_values([4,5,6])  
p1.print(l1)
p1.print(l2) 