class solution(object):
    def __init__(self,arr,target):
        self.arr = arr
        self.target = target
    def twosum(self):
        prevmap = {}
        for i , n in enumerate(self.arr):
            diff = self.target - n      #3 4 2
            if diff in prevmap:     
                print(diff)    
                return [prevmap[diff],i]
            prevmap[n] = i            #3:0,2:1,4:2 
            print(prevmap)
            
ar = [3,2,4]
t = 6
s1 = solution(ar,t)
#print(s1.twosum())
s1.twosum()