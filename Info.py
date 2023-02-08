"""
CLASS_TIME
Begin time of classes
eg.
8:15AM = [8, 15]
13:00 = [13, 0]
"""
CLASS_TIME = [
    [8, 15],
    [9, 10],
    [10, 15],
    [11, 10],
    [13, 0],
    [13, 55],
    [15, 0],
    [15, 55],
    [16, 50],
    [18, 0],
    [18, 55],
    [19, 50],
    [20, 45]
]

"""
CLASS_PERIOD:
length of class in minute
eg. 45 = 45 min
"""
CLASS_PERIOD= 45

"""
CLASS_NUM:
number of classes in a day
"""
CLASS_NUM = len(CLASS_TIME)

"""
WEEK_LEN:
number of day in a week
"""
WEEK_LEN = 7