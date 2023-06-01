import os

def run():
    cwd = os.getcwd()

    categoryDir = 'for play'

    fileList = os.listdir(os.path.join(cwd, categoryDir))

    id = 92
    result = []
    for i in fileList:
        data = {
            "id": id,
            "name": "Item name {}".format(id),
            "description": "",
            "stock": 0,
            "price": 0,
            "images": ["recursos/{}/{}".format(categoryDir, i)],
            "rating": 0
        }
        id += 1
        result.append(data)

    print(result)


if __name__ == "__main__":
    run()