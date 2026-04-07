#include <algorithm>
#include <iostream>
#include <cstdlib>
using namespace std;

// Problem: How to find the missing number in integer array of 1 to 100?
int main() {

    int arr[100]={0};
    int temp[100]={0};
     int n = sizeof(arr) / sizeof(arr[0]);

    for(int it=0;it<100;it++){
        int random_num=(rand() % 100) + 1;
        arr[it]=random_num;
    }

    sort(arr,arr+n);

    for(int i=0;i<100;i++){
        int num = arr[i];
        temp[num-1]=1;
        cout<<num<<" ";
    }


    cout<<"Printing Missing Number: "<<endl;


    for(int i=0;i<100;i++){
        if(temp[i]==0){
            cout<<" "<<i+1;
        }
    }


    return 0;
}
